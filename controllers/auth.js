const User = require("../models/user");

const bcrypt = require("bcryptjs");

exports.getSignIn = (req, res, next) => {
  let errorMessage = req.flash('error');
  if (errorMessage.length > 0) {
    errorMessage = errorMessage[0]
  } else {
    errorMessage = null
  };
  res.render("auth/signin", {
    path: "/signin",
    docTitle: "signin",
    isAuthenticated: false,
    errorMessage : errorMessage,
    isLoggedIn : req.session.isLoggedIn,
    userId : req.session.userId
    // csrfToken: req.csrfToken(),
  });
};

exports.postSignIn = async (req, res, next) => {
    const emailID = req.body.emailID;
    const password = req.body.password;

    const user = await User.findOne({email : emailID});

    if(!user){
        req.flash('error', 'Invalid email or password');
        return res.redirect("/signin");
    }

    // match password
    if(password === user.password){
        req.session.isLoggedIn = true;
        req.session.userId = user._id;
        req.session.mastership = user.isManager;
        req.session.userName = user.name.split(" ")[0];
        await req.session.save();
        return res.redirect("/")
    }

    // password incorrect
    req.flash('error', 'Invalid email or password');
    return res.redirect('/signin')
};

exports.postSignOut = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};