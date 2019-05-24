const apiImage = require("./api_image");
const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

router.get(["/home", "/"], (req, res) => {
  res.render("home", {
    scripts: ["vibrant-color-gen.js", "color-picker.js", "send-palette.js", "user-save-palette.js"]
  });
});



module.exports = router;
