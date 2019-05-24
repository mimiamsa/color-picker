const apiPalette = require("./api_palette");
const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)

router.get("/profile", (req, res) => {
  apiPalette
    .getAll()
    .then(palettes => {
      res.render("profile", { palettes, scripts: ["palette-list.js"] });
    })
    .catch(err => console.log(err));
});

module.exports = router;
