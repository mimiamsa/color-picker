const express = require("express");
const userModel = require("../models/user");
const router = new express.Router();
const bodyParser = require("body-parser");
const create = user => {
  // console.log(user);
  return userModel.create(user);
};

const getOne = id => userModel.findById({ _id: id }).populate({path: "palette_id", populate: {
  path: 'image'
}});

const getAll = () => userModel.find();

const getOneBy = query => userModel.findOne(query);
const pushPalette = (idUser, idPalette) =>
  userModel.updateOne({ _id: idUser }, { $push: { palette_id: idPalette } });
// router.post("/create", (req, res) => {
//   userModel
//     .create(req.body)
//     .then(users => res.status(200).json(users))
//     .catch(dbErr => res.json(dbErr));
// });

router.get("/:id", (req, res) => {
  getOne(req.params.id)
    .then(user => res.status(200).json(user))
    .catch(dbErr => res.json(dbErr));
});

router.get("/all", (req, res) => {
  getAll()
    .then(user => res.status(200).json(user))
    .catch(dbErr => res.json(dbErr));
});

router.patch("/push-palette", (req, res) => {
  pushPalette(req.user._id, req.body.id_palette)
    .then(dbRes => {
      // console.log("ici")
      console.log(dbRes);
      return res.status(200).json(dbRes);
    })
    .catch(dbErr => {
      console.log(dbErr);
      return res.send(dbErr);
    });
});

module.exports = {
  create,
  getAll,
  getOne,
  getOneBy,
  router
};
