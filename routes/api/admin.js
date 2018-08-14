const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
//load user model
const Admin = require("../../models/admin");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//load input validator
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

//@route GET /api/admin/test
//@desc Tests get route
//@access public
router.get("/test", (req, res) => res.json({ message: "admin works" }));

//@route POST /api/admin/register
//@desc register admin
//@access public
router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check Validation

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Admin.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json({ errors });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // Size
        r: "pg", // Rating
        d: "mm" // Default
      });
      const newUser = new Admin({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
//@route POST /api/admin/login
//@desc Login admin/returning jwt
//@access public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // Check Validation

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //find admin by email

  Admin.findOne({ email }).then(user => {
    if (!user) {
      errors.email = "User not found";
      return res.status(404).json({ errors });
    }
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user matched

        const payload = { id: user.id, name: user.name, avatar: user.avatar }; //create jwt payload

        //send token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 360000000
          },
          (err, token) => {
            res.json({
              sucess: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "password inncorect";
        return res.status(400).json({ errors });
      }
    });
  });
});
//@route POST /api/admin/current
//@desc return current user
//@access private

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
