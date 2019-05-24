const userAPI = require("./api_user"); // import user api for data manipulation
const express = require("express"); // import express in this module
const router = new express.Router(); // create an app sub-module (router)
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt"); // bcrypt is a famous lib for data encryption
const bcryptSalt = 10; // the salt level defines the level of encryption
const ensureLogin = require("connect-ensure-login");

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  userAPI
    .getOne(id)
    .then(user => {
      cb(null, user);
    })
    .catch(err => {
      cb(err);
    });
});

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" }, // change default username credential to email
    function(email, passwd, next) {
      userAPI
        .getOneBy({ email })
        .then(user => {
          // db query success
          // console.log(user, passwd)
          if (!user)
            return next(null, false, { message: "Incorrect username" });
          if (!bcrypt.compareSync(passwd, user.password))
            return next(null, false, {
              message: "Incorrect password"
            });
          else return next(null, user); // it's all good my friend !
        })
        .catch(dbErr => next(dbErr)); // if the db query fail...
    }
  )
);

router.get("/register", (req, res) => {
  res.render("register", {
    scripts: ["create-user.js"]
  });
});

router.post("/register", (req, res) => {
  const { email, name, lastname, city, password } = req.body;
  userAPI
    .getOneBy({ email: req.body.email })
    .then(checkMail => {
      if (checkMail) {
        // check if mail already in database
        const msg = {
          txt: "This email is already registered in database",
          status: "warning"
        };

        return res.send(msg); // utiliser ca pour afficher le message dans la partie client si le mail existe deja
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
      // console.log("ici")
      userAPI
        .create({ name, lastname, email, city, password: hashPass })
        .then(dbRes => {
          console.log("grats !!!!");
          const msg = {
            txt: "Congrats ! You registered successfully",
            status: "success"
          };
          res.send(msg);
        })
        .catch(dbErr => {
          const msg = {
            txt: "Oh no ! A database error occured while registering",
            status: "error"
          };
          return res.send(msg);
        });
    })
    .catch(err => {
      console.log(err);
    });
});

// router.get("/allUsers", (req, res) => {
//   User.find()
//     .then(users => {
//       res.render("allUsers", { users });
//     })
//     .catch(err => console.log(err));
// });

// router.get("/user-profile", (req,res) => {
//   userAPI.getAll()
// })

router.get("/login", (req, res) => {
  // console.log("failed", req.flash("error"))
  res.render("login", {
    msg: req.flash("error"),
    scripts: ["login.js"]
  });
});

router.get("/user-profile", ensureLogin.ensureLoggedIn(), (req, res) => {
  let userSwatches,
    userSwatchesName,
    userSwatchesCat,
    userSwatchesLink,
    userSwatchesCredit;
  console.log(req.user.palette_id);
  // userSwatches = req.user.palette_id;
  // userSwatchesName = req.user.palette_id[0].palette_name;
  // userSwatchesCat = req.user.palette_id[0].image.category;
  // userSwatchesLink = req.user.palette_id[0].image.link;
  // userSwatchesCredit = req.user.palette_id[0].image.link;

  res.render("user-profile", {
    scripts: ["palette-list.js"],
    user: req.user,
    userSwatches: req.user.palette_id,
    
  });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard/user/user-profile",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/dashboard/user/login");
});

// router.get("/:id/details", (req, res) => {
//   User.findById(req.params.id)
//     .then(users => {
//       res.json(users)
//       // res.render("allUsers", { users });
//     })
//     .catch(err => console.log(err));
// });

module.exports = router;
