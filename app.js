const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");

const mongoose = require("mongoose");

const session = require("express-session");
const mongoDbSession = require("connect-mongodb-session")(session);

const csrf = require('csurf');

const flash = require('connect-flash');

const path = require("path");

const User = require("./models/user")


// Controllers
const errorsController = require("./controllers/errors");

// Create app
const app = express();

app.set("view engine", "ejs");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);

app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname, "images")));

const MONGO_URI =
  "mongodb+srv://phongdt:chat15031959@cluster0.n29hy.mongodb.net/Site_lotte";
const store = new mongoDbSession({
  uri: MONGO_URI,
  collection: "sessions",
});

// app.use(
//   session({
//     secret: "whatever",
//     resave: false,
//     saveUninitialized: false,
//     store: store,
//   })
// );

app.use(csrf());

// add isLoggedIn && csrfToken to render
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next()
})

app.use(flash()); 

// Routes User user in request

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

app.use(adminRoutes);
app.use(authRoutes);
app.use(userRoutes);

// app.get("/500", errorsController.get500);
// app.use("/", errorsController.get404);

// app.use((error, req, res, next) => {
//   res.render("500", {
//     docTitle: "Error occurred",
//     path: null,
//   });
// });
app.listen(process.env.PORT || 8000)

// mongoose
//   .connect(
//     MONGO_URI
//   )
//   .then((results) => {
//     // console.log(results);
//     app.listen(process.env.PORT || 3000);//suitable for many environments to avoid error 500
//   })
//   .catch((err) => {
//     console.log(err);
//   });
