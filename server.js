const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var socket = require("socket.io");
var Chat = require("./models/chat");
const passport = require("passport");

const register = require("./routes/api/register");
const faq = require("./routes/api/faq");
const searchtoken = require("./routes/api/searchtoken");
const admin = require("./routes/api/admin");
const chat = require("./routes/api/chat");
const path = require("path");

const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//db config
const db = require("./config/keys").mongoURI;

//connect to mongo
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("mongo db connected"))
  .catch(err => console.log(err));

// app.get("/", (req, res) => res.send("hello world"));

//passport middleware
app.use(passport.initialize());

//Passport config

require("./config/passport")(passport);

app.get("/getIP", getClientIP);

function getClientIP(req, res, next) {
  try {
    var IPs =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    if (IPs.indexOf(":") !== -1) {
      IPs = IPs.split(":")[IPs.split(":").length - 1];
    }

    return res.json({ IP: IPs.split(",")[0] });
  } catch (err) {
    return res.json({ message: "got error" });
  }
}

//use Routes
app.use("/api/register", register);
app.use("/api/faq", faq);
app.use("/api/searchtoken", searchtoken);
app.use("/api/admin", admin);
app.use("/api/chat", chat);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//asign port no
var server = app.listen(process.env.PORT || 5000, function() {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
});

// var io = socket(server);

// io.on("connection", socket => {
//   console.log(socket.id);

//   socket.on("SEND_MESSAGE", data => {
//     var id = 1;
//     Chat.findOne({ id }).then(user => {
//       if (user) {
//         Chat.findOneAndUpdate(
//           { id: 1 },
//           {
//             $push: {
//               conversation: {
//                 username: data.username,

//                 message: data.message
//               }
//             }
//           },
//           { new: true },
//           (err, user) => {
//             io.emit("RECEIVE_MESSAGE", user);
//           }
//         );
//       } else {
//         const User = new Chat({
//           id: 1,
//           conversation: [
//             {
//               username: data.username,

//               message: data.message
//             }
//           ]
//         });
//         User.save();
//       }
//     });
//   });
//   //   io.emit("RECEIVE_MESSAGE", data=>
//   // {
//   //   Chat
//   // });
// });
