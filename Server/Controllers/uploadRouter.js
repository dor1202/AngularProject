const express = require("express");
const fs = require("fs");
const router = express.Router();
const globalFunctions = require('./globalFunctions');
const { v4: uuidv4 } = require('uuid');
const path = require("path");

let folderName = globalFunctions.GetFolderName();
const fatherDir = path.join(__dirname, '../');

// ! POST:

router.post("/upload/createDir", function (req, res) {
    // checking and creating the folders
    let name = req.body.name;
    if (name == null || name == undefined) name = "storage";

    folderName = name;
    let desc = req.body.desc;
    let pick = req.body.pick;
    let privCode = req.body.privatecode;

    let storagePath = path.join(fatherDir, name);
    globalFunctions.CheckAndMakeDir(storagePath);

    storagePath = path.join(fatherDir, name, "Pictures");
    globalFunctions.CheckAndMakeDir(storagePath);

    storagePath = path.join(fatherDir, name, "Data");
    globalFunctions.CheckAndMakeDir(storagePath);

    // create or update the json file
    let FolderData = {
        name: name,
        description: desc,
        layoutPick: pick,
        editModeStatus: false,
        privateModeCode: privCode,
        privateModeStatus: false,
        Categories: [
            { name: 'Animals', code: 'Animals' },
            { name: 'Beuty', code: 'Beuty' },
            { name: 'Views', code: 'Views' },
        ]
    };

    // create the folder
    storagePath = storagePath + '\\FolderData' + '.json';
    globalFunctions.WriteDataToJSON(FolderData, storagePath);

    // write documentation of the folder in the server
    let CreationData = {
        Foldername: name,
        DarkThemeStatus: false
    };
    // create the folder
    storagePath = path.join(fatherDir) + '\\FolderData' + '.json';
    globalFunctions.WriteDataToJSON(CreationData, storagePath);

    res.send('createDir POST ended');
});

router.post("/upload/uploadFilePic", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    let sampleFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    let id = uuidv4();
    sampleFile = req.files.file;
    uploadPath = fatherDir + folderName + "\\" + "\\Pictures\\" + id + '.png';
    // Use the mv() method to place the file somewhere on your server
    sampleFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);

        res.send("File uploaded!");
    });

    // the image data
    let fileName = String(sampleFile.name);
    let fileNamearr = fileName.split('.');
    let fileNameWithoutSign = globalFunctions.getNameWithoutSign(fileNamearr);
    let data = globalFunctions.MakeJSONdataModel(id, fileNameWithoutSign);

    uploadPath = fatherDir + folderName + "\\" + "Data\\" + id + '.json';
    globalFunctions.WriteDataToJSON(data, uploadPath);
});

router.post("/upload/uploadWebCamPic", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    let sampleFile = req.body.image;
    // remove the start of the string that contains "data:image/png;base64,"
    let data = sampleFile.replace(/^data:image\/\w+;base64,/, "");
    //create buffer to save to local system
    let buf = Buffer.from(data, "base64");
    // using write file to save the data
    let imgName = globalFunctions.getUniqueName('webCamImage');
    let id = uuidv4();
    let uploadPath = fatherDir + folderName + "\\" + "Pictures\\" + id + '.png';
    fs.writeFile(uploadPath, buf, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("image saved");
            res.send("image saved");
        }
    });

    // the image data
    let JSONdata = globalFunctions.MakeJSONdataModel(id, imgName);

    uploadPath = fatherDir + folderName + "\\" + "Data\\" + id + '.json';
    globalFunctions.WriteDataToJSON(JSONdata, uploadPath);
});

router.post("/upload/uploadUnspleshPic", function (req, res) {
    let data = req.body;
    let fileName = req.body.alt_description;
    if (fileName == null || fileName == '') {
        fileName = globalFunctions.getUniqueName('unsplashImage');
    }

    // json data
    let id = uuidv4();
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    let uploadPath = fatherDir + folderName + "\\" + "Data\\" + id + '.json';
    let JSONdata = globalFunctions.MakeJSONdataModel(id, fileName, data.alt_description);
    globalFunctions.WriteDataToJSON(JSONdata, uploadPath);

    // image file
    let img = data.links.download;
    uploadPath = fatherDir + folderName + "\\" + "Pictures";
    globalFunctions.download(img, id, uploadPath);
    res.send('photo uploaded');
});

module.exports = router;