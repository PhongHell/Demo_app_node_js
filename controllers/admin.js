const url = require("url");

const fs = require("fs");
const path = require("path");
var mongoose = require('mongoose');
const User = require("../models/user");
const PlaceEffect = require("../models/placeEffect");
const moment = require("moment");
const ObjectId = require('mongoose').Types.ObjectId;

exports.getHomeWatcher = (req, res, next) => {
    const placeEffect = PlaceEffect.find({})
    res.render("pages/home", {
        docTitle: "home page",
        isAuthenticated: false,
        isLoggedIn : req.session.isLoggedIn,
        userId : req.session.userId,
        userName : req.session.userName
        // csrfToken: req.csrfToken(),
    });
};

exports.postHomePage = (req, res, next) => {

}

exports.getManagementPage = async(req, res, next ) => {

    const {query} = req;
    const users = await User.find({});

    const convertUsers = users.map((user) => {
            return {...user._doc, onStart : moment(user.onStart).format("DD-MM-YYYY")}
    }).filter((user) => !user.isManager);

    res.render("admin/userManagement", {
        docTitle: "admin management page",
        isAuthenticated: false,
        listUser : query.search ? convertUsers.filter((user) => {
            if( user.email && user.name){
                return  user.email.includes(query.search) || user.name.includes(query.search);
            }
        }) : convertUsers,
        isLoggedIn : req.session.isLoggedIn,
        userId : req.session.userId,
        search : query.search ? query.search : ""
        // csrfToken: req.csrfToken(),
    });
}

exports.postManagementPage = (req, res, next ) => {
        const {query, params, body} = req;
        const searchName = body.searchName;
        res.redirect(`/admin/management/?search=${searchName}`)
}

exports.getAddNewUserWatcher = (req, res, next) => {
    res.render("pages/registerUser", {
        docTitle: "register page",
        isAuthenticated: false,
    })
}
