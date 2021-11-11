const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const globalFunctions = require('./globalFunctions');

let folderName = globalFunctions.GetFolderName();
const fatherDir = path.join(__dirname, '../');

// ! POST:

router.post("/image/changeImageData", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    let data = [req.body.id, req.body.name, req.body.caption, req.body.categories, req.body.location, req.body.favorite, req.body.privateMode];
    let uploadPath = fatherDir + folderName + "\\" + "Data\\" + data[0] + '.json';

    let jsonData = globalFunctions.ReadDataJSON(uploadPath);
    jsonData.name = data[1];
    jsonData.caption = data[2];
    jsonData.categories = data[3];
    jsonData.location = data[4];
    jsonData.favorite = data[5];
    jsonData.privateMode = data[6];
    globalFunctions.WriteDataToJSON(jsonData, uploadPath);
});

router.post("/image/getImagesNonePrivateCategory", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    let pickedCategory = req.body.category;
    const picturePath = fatherDir + folderName + '\\Pictures';
    const picturePathData = fatherDir + folderName + '\\Data';
    const rData = fs.readdirSync(picturePathData);
    const r = fs.readdirSync(picturePath);
    let fileArr = [];
    for (let index = 0; index < r.length; index++) {
        let arr = r[index].split('.');
        let nameWithoutSign = globalFunctions.getNameWithoutSign(arr);
        let path = picturePathData + '\\' + nameWithoutSign + '.json';
        let item = globalFunctions.ReadDataJSON(path);
        if (item.categories == null) continue;
        for (let j = 0; j < item.categories.length; j++) {
            let jsonData = globalFunctions.ReadDataJSON(picturePathData + '\\' + rData[index]);
            if (item.categories[j].name == pickedCategory && jsonData.privateMode == false) {
                let pictureitem = fs.readFileSync(`${picturePath}\\${r[index]}`);
                pictureitem = 'data:image/png;base64,' + pictureitem.toString('base64');
                fileArr.push(r[index]);
                fileArr.push(pictureitem);
            }
        }
    }
    res.send(fileArr);
});

router.post("/image/getImagesPrivateCategory", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    let pickedCategory = req.body.category;
    const picturePath = fatherDir + folderName + '\\Pictures';
    const dataPath = fatherDir + folderName + '\\Data';
    const r = fs.readdirSync(picturePath);
    let fileArr = [];
    for (let index = 0; index < r.length; index++) {
        let arr = r[index].split('.');
        let nameWithoutSign = globalFunctions.getNameWithoutSign(arr);
        let path = dataPath + '\\' + nameWithoutSign + '.json';
        let item = globalFunctions.ReadDataJSON(path);
        if (item.categories == null) continue;
        for (let j = 0; j < item.categories.length; j++) {
            if (item.categories[j].name == pickedCategory) {
                let pictureitem = fs.readFileSync(`${picturePath}\\${r[index]}`);
                pictureitem = 'data:image/png;base64,' + pictureitem.toString('base64');
                fileArr.push(r[index]);
                fileArr.push(pictureitem);
            }
        }
    }
    res.send(fileArr);
});

// ! GET:

router.get("/image/getImages", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    const picturePath = fatherDir + folderName + '\\Pictures';
    const r = fs.readdirSync(picturePath);
    let fileArr = [];
    for (let index = 0; index < r.length; index++) {
        let pictureitem = fs.readFileSync(`${picturePath}\\${r[index]}`);
        pictureitem = 'data:image/png;base64,' + pictureitem.toString('base64');
        fileArr.push(r[index]);
        fileArr.push(pictureitem);
    }
    res.send(fileArr);
});

router.get("/image/getImagesNonePrivate", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    const picturePath = fatherDir + folderName + '\\Pictures';
    const picturePathData = fatherDir + folderName + '\\Data';
    const rData = fs.readdirSync(picturePathData);
    const r = fs.readdirSync(picturePath);
    let fileArr = [];
    for (let index = 0; index < r.length; index++) {
        let pictureitem = fs.readFileSync(`${picturePath}\\${r[index]}`);
        let jsonData = globalFunctions.ReadDataJSON(picturePathData + '\\' + rData[index]);
        if (jsonData.privateMode == false) {
            pictureitem = 'data:image/png;base64,' + pictureitem.toString('base64');
            fileArr.push(r[index]);
            fileArr.push(pictureitem);
        }
    }
    res.send(fileArr);
});

router.get("/image/getImageData", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    const ImageData = req.query.name;
    let arr = ImageData.split('.');
    let name = globalFunctions.getNameWithoutSign(arr) + '.json';
    const picturePath = fatherDir + folderName + '\\Data';
    const r = fs.readdirSync(picturePath);
    for (let index = 0; index < r.length; index++) {
        if (r[index] == name) {
            let jsonData = globalFunctions.ReadDataJSON(picturePath + '\\' + r[index]);
            res.send(jsonData);
        }
    }
});

router.get("/image/getSearchedImages", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    const picturePath = fatherDir + folderName + '\\Pictures';
    const dataPath = fatherDir + folderName + '\\Data';
    const r = fs.readdirSync(picturePath);
    let fileArr = [];
    for (let index = 0; index < r.length; index++) {
        let arr = r[index].split('.');
        let nameWithoutSign = globalFunctions.getNameWithoutSign(arr);
        let path = dataPath + '\\' + nameWithoutSign + '.json';
        let item = globalFunctions.ReadDataJSON(path);
        if (item.name.startsWith(req.query.query)) {
            let pictureitem = fs.readFileSync(`${picturePath}\\${r[index]}`);
            pictureitem = 'data:image/png;base64,' + pictureitem.toString('base64');
            fileArr.push(r[index]);
            fileArr.push(pictureitem);
        }
    }
    res.send(fileArr);
});

router.get("/image/getSearchedImagesNonePrivate", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    const picturePath = fatherDir + folderName + '\\Pictures';
    const picturePathData = fatherDir + folderName + '\\Data';
    const rData = fs.readdirSync(picturePathData);
    const r = fs.readdirSync(picturePath);
    let fileArr = [];
    for (let index = 0; index < r.length; index++) {
        let arr = r[index].split('.');
        let nameWithoutSign = globalFunctions.getNameWithoutSign(arr);
        let path = picturePathData + '\\' + nameWithoutSign + '.json';
        let item = globalFunctions.ReadDataJSON(path);
        if (item.name.startsWith(req.query.query)) {
            let jsonData = globalFunctions.ReadDataJSON(picturePathData + '\\' + rData[index]);
            if (jsonData.privateMode == false) {
                let pictureitem = fs.readFileSync(`${picturePath}\\${r[index]}`);
                pictureitem = 'data:image/png;base64,' + pictureitem.toString('base64');
                fileArr.push(r[index]);
                fileArr.push(pictureitem);
            }
        }
    }
    res.send(fileArr);
});

router.get("/image/getFiles", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    const picturePath = fatherDir + folderName + '\\Pictures';
    const dataPath = fatherDir + folderName + '\\Data';
    const r = fs.readdirSync(picturePath);
    let fileArr = [];
    for (let index = 0; index < r.length; index++) {
        let pictureitem = fs.readFileSync(`${picturePath}\\${r[index]}`);
        pictureitem = pictureitem.toString('base64');
        fileArr.push(pictureitem);

        let nameArr = r[index].split('.');
        let JSONname = globalFunctions.getNameWithoutSign(nameArr);
        let dataitem = fs.readFileSync(`${dataPath}\\${JSONname}.json`);
        dataitem = JSON.parse(dataitem);
        fileArr.push(dataitem);
    }
    res.send(fileArr);
});

module.exports = router;