const express = require("express");
const router = express.Router();
var Chat = require("../../models/chat");
const Admin = require("../../models/admin");
//@route GET api/chat/test
//@desc Tests post route
//@access public
router.get("/test", (req, res) => {
  res.json({ message: "chat works" });
});

//@route Post api/chat/send
//@desc Tests post route
//@access public
router.post("/send", (req, res) => {
  var unique = req.body.unique;
  Chat.findOne({ unique }).then(user => {
    if (user) {
      Chat.findOneAndUpdate(
        { unique },
        {
          $push: {
            conversation: {
              username: req.body.username,

              message: req.body.message
            }
          }
        },
        { new: true },
        (err, user) => {
          res.json({ user });
        }
      );
    } else {
      const User = new Chat({
        unique: req.body.unique,
        conversation: [
          {
            username: req.body.username,

            message: req.body.message
          }
        ]
      });
      User.save()
        .then(user => {
          res.json({ user });
        })
        .catch(err => {
          throw err;
        });
    }
  });
});
//@route GET api/chat/recive
//@desc Tests post route
//@access public
router.post("/recive", (req, res) => {
  //   res.json({ message: "recive works" });
  let unique = req.body.unique;
  Chat.findOne({ unique }).then(data => {
    res.json(data);
  });
});

//@route GET api/chat/find
//@desc Tests get route
//@access public
router.get("/find", (req, res) => {
  Chat.find().then(user => res.json({ user }));
});

//@route GET api/chat/admin
//@desc Tests get route
//@access public
router.get("/admin", (req, res) => {
  Admin.find().then(user => res.json({ user }));
});
// res.json({message:'works'});

module.exports = router;
