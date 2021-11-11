const express = require("express");
const path = require("path");
const router = express.Router();
const globalFunctions = require('./globalFunctions');

let folderName = globalFunctions.GetFolderName();
const fatherDir = path.join(__dirname, '../');

// ! POST:

router.post("/folderData/editCategories", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    let updatedCategories = req.body.UpdatedCategoryList;
    const picturePath = fatherDir + folderName + '\\Data' + '\\FolderData.json';
    let item = globalFunctions.ReadDataJSON(picturePath);
    item.Categories = updatedCategories;
    globalFunctions.WriteDataToJSON(item, picturePath);
    res.send(item.Categories);
});

// ! GET:

router.get("/folderData/toggelEditMode", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    const picturePath = fatherDir + folderName + '\\Data' + '\\FolderData.json';
    let item = globalFunctions.ReadDataJSON(picturePath);
    item.editModeStatus = !item.editModeStatus;
    globalFunctions.WriteDataToJSON(item, picturePath);
    res.send('toggeled to: ' + item.editModeStatus);
});

router.get("/folderData/toggelListAndPortrait", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    const picturePath = fatherDir + folderName + '\\Data' + '\\FolderData.json';
    let item = globalFunctions.ReadDataJSON(picturePath);

    if (item.layoutPick == 'list')
        item.layoutPick = 'grid';
    else
        item.layoutPick = 'list';
    globalFunctions.WriteDataToJSON(item, picturePath);
    res.send('toggeled to: ' + item.editModeStatus);
});

router.get("/folderData/toggelPrivateMode", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    const picturePath = fatherDir + folderName + '\\Data' + '\\FolderData.json';
    let item = globalFunctions.ReadDataJSON(picturePath);
    item.privateModeStatus = !item.privateModeStatus;
    globalFunctions.WriteDataToJSON(item, picturePath);
    res.send('toggeled to: ' + item.privateModeStatus);
});

router.get("/folderData/getEditModeStatus", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    const picturePath = fatherDir + folderName + '\\Data' + '\\FolderData.json';
    try {
        let item = globalFunctions.ReadDataJSON(picturePath);
        res.send(item.editModeStatus);
    }
    catch (err) {
        res.send(false);
    }
});

router.get("/folderData/privateModePassword", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    const picturePath = fatherDir + folderName + '\\Data' + '\\FolderData.json';
    try {
        let item = globalFunctions.ReadDataJSON(picturePath);
        res.send(item.privateModeCode);
    }
    catch (err) {
        let errorData = { errorMessage: 'error in privateModePassword function' };
        res.send(errorData);
    }
});

router.get("/folderData/getPrivateModeStatus", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    const picturePath = fatherDir + folderName + '\\Data' + '\\FolderData.json';
    try {
        let item = globalFunctions.ReadDataJSON(picturePath);
        res.send(item.privateModeStatus);
    }
    catch (err) {
        res.send(false);
    }
});

router.get("/folderData/getLayoutPickStatus", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    const picturePath = fatherDir + folderName + '\\Data' + '\\FolderData.json';
    try {
        let item = globalFunctions.ReadDataJSON(picturePath);
        res.send(item.layoutPick);
    }
    catch (err) {
        res.send('error in getLayoutPickStatus function');
    }
});

router.get("/folderData/getCategories", function (req, res) {
    if (globalFunctions.checkIfFolderNameIsValid(folderName, res)) return;
    const picturePath = fatherDir + folderName + '\\Data' + '\\FolderData.json';
    try {
        let item = globalFunctions.ReadDataJSON(picturePath);
        res.send(item.Categories);
    }
    catch (err) {
        let errorData = { errorMessage: 'error in getCategories function' };
        res.send(errorData);
    }
});

router.get("/folderData/checkFolderExist", function (req, res) {
    let storagePath = fatherDir + 'FolderData' + '.json';
    try {
        let data = globalFunctions.ReadDataJSON(storagePath);
        if (data == null || data == undefined) {
            res.send(false);
        }
        res.send(true);
    }
    catch (err) {
        res.send(false);
    }
});

module.exports = router;