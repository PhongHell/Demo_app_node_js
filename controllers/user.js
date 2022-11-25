const url = require("url");

const fs = require("fs");
const path = require("path");
var mongoose = require('mongoose');
const User = require("../models/user");
const moment = require("moment");
const ObjectId = require('mongoose').Types.ObjectId;

exports.getEditProfile = (req, res, next) => {
     res.render("pages/user", {
          path: "/",
          docTitle: "user page",
          // csrfToken: req.csrfToken(),
      });
}

exports.postEditProfile = (req, res, next ) => {
     res.render("pages/user"), {
          docTitle : "user profile"
     }
}

exports.postUpdateUser = (req, res, next) => {
     
}


exports.getUserProfileWatcher = (req, res, next ) => {
     const {params, query, originalUrl} = req
     const id = params.userId;
     const {mastership, userId} = req.session;
     if(id !== userId && !mastership){
         return res.redirect("/")
     }
 
     if(!ObjectId.isValid(id)){
         return res.redirect("/")
     }
     let isEdit ;
     if(originalUrl.split("/")[1] === "edit"){
         isEdit = true;
     }
 
     
 
     User.findById(id)
         .then((user) => {
             if(!user){
                 return res.redirect("/")
             }
             
             res.render("pages/user", {
                 docTitle: "user page",
                 isAuthenticated: false,
                 user : user,
                 id : id,
                 isEdit : isEdit,
                 isLoggedIn : req.session.isLoggedIn,
                 userId : req.session.userId
                 // csrfToken: req.csrfToken(),
             });
 
         })
         .catch()
 }

exports.postUserProfileWorker = (req, res, next) => {

}
 
exports.getAddNewUserWatcher = (req, res, next) => {
    res.render("pages/registerUser", {
        docTitle: "register page",
        isAuthenticated: false,
    })
}

exports.postDeleteUser = (req, res, next) => {
    
}