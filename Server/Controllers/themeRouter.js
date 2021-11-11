const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const globalFunctions = require('./globalFunctions');

// ! GET:

router.get("/theme/toggelThemeStatus", function (req, res) {
    const themePath = path.join(__dirname, '../') + "\\FolderData.json";
    try {
        let data = globalFunctions.ReadDataJSON(themePath);
        data.DarkThemeStatus = !data.DarkThemeStatus;
        globalFunctions.WriteDataToJSON(data, themePath);
        res.send(data.DarkThemeStatus)
    }
    catch (err) {
        res.send('error in toggelThemeStatus function');
    }
});

router.get("/theme/getThemeStatus", function (req, res) {
    const themePath = path.join(__dirname, '../') + "FolderData.json";
    try {
        let data = globalFunctions.ReadDataJSON(themePath);
        res.send(data.DarkThemeStatus)
    }
    catch (err) {
        let t = new Date();
        let hour = t.getHours();
        if (hour >= 18) {
            res.send(true);
        }
        else {
            res.send(false);
        }
    }
});

router.get("/theme/getDarkTheme", function (req, res) {
    const themePath = path.join(__dirname, '../') + "\\Themes\\md-dark-indigo\\theme.css";
    let data = fs.readFileSync(themePath);
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.write(data);
    res.end();
});

router.get("/theme/getLightTheme", function (req, res) {
    const themePath = path.join(__dirname, '../') + "\\Themes\\md-light-indigo\\theme.css";
    let data = fs.readFileSync(themePath);
    res.writeHead(200, { 'Content-Type': 'text/css' });
    res.write(data);
    res.end();
});

module.exports = router;