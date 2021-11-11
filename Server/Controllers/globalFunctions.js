const fs = require("fs");
const path = require("path");
const request = require('request');

module.exports = {
    GetFolderName: function () {
        try {
            let dataPath = path.join(__dirname, '../') + '\\FolderData' + '.json';
            let rawdata = fs.readFileSync(dataPath);
            let data = JSON.parse(rawdata);
            if (data == null || data == undefined) {
                return ' ';
            }
            else {
                return data.Foldername;
            }
        }
        catch (err) {
            return 'no folder found';
        }
    },

    CheckAndMakeDir: function (storagePath) {
        try {
            fs.accessSync(storagePath);
        }
        catch (err) {
            fs.mkdirSync(storagePath, (err) => {
                if (err) console.log("real problem !!!!");
            });
        }
    },

    WriteDataToJSON: function (JSONData, Location) {
        let data = JSON.stringify(JSONData);
        fs.writeFileSync(Location, data);
    },

    checkIfFolderNameIsValid: function (param, res) {
        if (param == 'no folder found' || param == undefined) {
            let errorData = { errormessage: 'error in folderName' };
            res.send(errorData);
            return true;
        }
        return false;
    },

    ReadDataJSON: function (Location) {
        let rawdata = fs.readFileSync(Location);
        let data = JSON.parse(rawdata);
        return data;
    },

    getUniqueName: function (fileName) {
        let d = Date().toString();
        d = d.replace(/\s+/g, '');
        d = d.substring(3, d.length - 25).split(':');
        let res = '';
        for (let index = 0; index < d.length; index++) {
            res += d[index];
        }
        return fileName + res;
    },

    MakeJSONdataModel: function (Id, ImgName, captionImg = '', categoriesImg = null, locationImgLat = null, locationImgLan = null, favoriteImg = false, privateModeImg = false) {
        let JSONdata = {
            id: Id,
            name: ImgName,
            caption: captionImg,
            categories: categoriesImg,
            location: {
                Lat: locationImgLat,
                Lan: locationImgLan
            },
            favorite: favoriteImg,
            privateMode: privateModeImg
        };
        return JSONdata;
    },

    download: function (uri, filename, path) {
        request.head(uri, function (err, res, body) {
            let fileNameWithType = filename + '.' + res.headers['content-type'].substring(6, res.headers['content-type'].length);
            path = path + '\\' + fileNameWithType;
            request(uri).pipe(fs.createWriteStream(path));
        });
    },


    getNameWithoutSign: function (arr) {
        let JSONname = '';
        for (let index = 0; index < arr.length - 1; index++) {
            JSONname += arr[index];
        }
        return JSONname;
    }
};