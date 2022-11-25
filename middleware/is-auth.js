exports.isAuth = (req, res, next) => {
    if (!req.session.isLoggedIn ) {
        return res.redirect('/')
    }
    next();
}

exports.isAdmin = (req, res, next) => {

    if(!req.session.mastership){
        return res.redirect('/')
    }
    next();
}