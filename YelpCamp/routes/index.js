let express = require("express")
let router = express.Router()
let passport = require("passport")
let User = require("../models/user")

//HOME - Landing Page
router.get("/", function(req, res){
    res.render("landing")
})


//====================================================
//AUTH ROUTE
//====================================================
//Show register form
router.get("/register", function(req, res){
    res.render("register")
})

//handle sign up logic
router.post("/register", function(req, res){
    let newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err.message)
            req.flash("error", err.message)
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username)
            res.redirect("/campgrounds")
        })
    })
})

//Show login form
router.get("/login", function(req, res){
    res.render("login")
})

//handle login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
})

//Logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!")
    res.redirect("/campgrounds")
})

module.exports = router