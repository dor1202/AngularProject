const express = require("express");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser");
const portNumber = 5555;

// routers
const themeRouter = require('./Controllers/themeRouter');
const uploadRouter = require('./Controllers/uploadRouter');
const imageRouter = require('./Controllers/imageRouter');
const folderDataRouter = require('./Controllers/folderDataRouter');

// uses
app.use(bodyParser.urlencoded());
// have to set big limit to transfer image
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(fileUpload());
app.use(themeRouter);
app.use(uploadRouter);
app.use(imageRouter);
app.use(folderDataRouter);

app.listen(portNumber, () => {
    console.log("app is up..");
});
