const express = require("express");
const imageModel = require("./../models/image");
const router = new express.Router();
const dataImage = require("./../data");

// const create = data => productModel.create(data);

// imageModel.create(dataImage)
//   .then(arg => {
//     console.log("image inserted success");
//   })
//   .catch(err => {
//     console.error("no image inserted", err);
//   });

// -------------------------------- METHODS --------------------------------

// Method to get all images in collection
const getAll = () => imageModel.find();

// Method to count all images in collection
const getImagesCount = (cat, clbk) => {
  const filter = cat ? {category: cat} : {}; // if cat is truthy ... else
  imageModel.find(filter, function(err, docs) {
    clbk(docs.length)
  })
};

// return a random number between 0 and count
const getRandomFromImageCount = (count) => Math.floor(Math.random() * count);

// Method to get a random image out of the whole image collection
const getOneRandom = (random) => {
    return imageModel
      .findOne()
      .skip(random)
      .exec();
};

// Method to get a random image that has cold category
const getOneRandomByCat = (skip, cat) => {
  return imageModel
    .find({ category: cat })
    .skip(skip)
    .exec();
};


// -------------------------------- ROUTES --------------------------------



// Route to get all images
router.get("/all", (req, res) => {
  getAll()
    .then(images => res.status(200).json(images))
    .catch(dbErr => res.send(dbErr));
});

// Route to get a random image
router.get("/random", (req, res) => {
  // call getImagesCount function without a cat (null) and the callback
  getImagesCount(null, count => {
    const rand = getRandomFromImageCount(count);
    getOneRandom(rand).then(dbRes => {
      // res.json(dbRes);
      res.send(dbRes);
    });
  })
});

router.get("/random/:cat", (req, res) => {
  const category = req.params.cat;

  function callback(count) {
    const rand = getRandomFromImageCount(count);
    getOneRandomByCat(rand, category).then(image => {
      // console.log(image)
      res.send(image[0]);
    });
  }

  // call getImagesCount function with a category name and the callback
  getImagesCount(category, callback)
});

module.exports = {
  getAll,
  // getOneColdPicRandom,
  // getOneHumanPicRandom,
  // getOneOutsidePicRandom,
  // getOneStillPicRandom,
  // getOneWarmPicRandom,
  getOneRandom,
  router
};


/*

// Method to get a random image that has outside category
const getOneOutsidePicRandom = (count) => {
  var random = Math.floor(Math.random() * count);
  return imageModel
    .find({ category: "outside" })
    .skip(random)
    .exec();
};

// Method to get a random image that has human category
const getOneHumanPicRandom = (count) => {
  var random = Math.floor(Math.random() * count);
  return imageModel
    .find({ category: "human" })
    .skip(random)
    .exec();
};

// Method to get a random image that has still life category
const getOneStillPicRandom = (count) => {
  var random = Math.floor(Math.random() * count);
  return imageModel
    .find({ category: "still life" })
    .skip(random)
    .exec();
};

// Method to get a random image that has warm category
const getOneWarmPicRandom = (count) => {
  var random = Math.floor(Math.random() * count);
  return imageModel
    .find({ category: "warm" })
    .skip(random)
    .exec();
};

// Method to get a random image that has cold category
const getOneColdPicRandom = (count) => {
  var random = Math.floor(Math.random() * count);
  return imageModel
    .find({ category: "cold" })
    .skip(random)
    .exec();
};

*/
/*
// Route to get a random human image
router.get("/random/human", (req, res) => {
  getOneHumanPicRandom().then(dbRes => {
    // res.json(dbRes);
    res.send(dbRes);
  });
});

// Route to get a random still image
router.get("/random/still", (req, res) => {
  getOneStillPicRandom().then(dbRes => {
    // res.json(dbRes);
    res.send(dbRes);
  });
});

// Route to get a random warm image
router.get("/random/warm", (req, res) => {
  getOneWarmPicRandom().then(dbRes => {
    // res.json(dbRes);
    res.send(dbRes);
  });
});

// Route to get a random cold image
router.get("/random/cold", (req, res) => {
  getOneColdPicRandom().then(dbRes => {
    // res.json(dbRes);
    res.send(dbRes);
  });
});

// Route to get a random outside image
router.get("/random/outside", (req, res) => {
  getOneOutsidePicRandom().then(dbRes => {
    // res.json(dbRes);
    res.send(dbRes);
  });
});
*/