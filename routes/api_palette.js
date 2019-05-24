const express = require("express");
const paletteModel = require("./../models/palette");

const router = new express.Router();

const create = paletteData => {
  // console.log(...paletteData);
  return paletteModel.create(...paletteData);
};

const getAll = () => paletteModel.find().populate("image");

const deleteOne = id => paletteModel.findByIdAndDelete(id);

// router.get("/list/:id", (req, res) => {
//   getAll()
//     .then(dbRes => res.status(200).json(dbRes))
//     .catch(dbErr => res.json(dbErr));
// });

router.get("/all", (req, res) => {
  getAll()
    .then(palettes => res.status(200).json(palettes))
    .catch(dbErr => res.json(dbErr));
});

router.post("/create", (req, res) => {
  // return console.log(req.body)
  paletteModel
    .create(req.body)
    .then(palette => res.status(200).json(palette))
    .catch(dbErr => res.json(dbErr));
});

router.delete("/delete/:id", (req, res) => {
  deleteOne(req.params.id)
    .then(palette => res.status(200).json(palette))
    .catch(dbErr => res.json(dbErr));
});

module.exports = {
  create,
  getAll,
  deleteOne,
  router
};
