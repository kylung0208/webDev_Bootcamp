let express = require("express")
let router = express.Router({mergeParams: true})
let Campground = require("../models/campground")

//INDEX - Show all campgrounds
router.get("/", (req, res) => {
    //Get all campgorounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.error(err)
        }
        else{
            console.log("Retrieve All Campgrounds in the DB")
            res.render("campgrounds/index", {campgrounds: allCampgrounds})
        }
    })
})

//CREATE - Add new campground to DB
router.post("/", isLoggedIn, (req, res) => {
    //get data from form and add to campgrounds DB
    let name = req.body.name
    let image = req.body.image
    let description = req.body.description
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampground = {
        name: name,
        image: image,
        description: description,
        author: author
    }
    //Create a new campground and save to DB
    Campground.create(newCampground, (err, newlyCreated)=>{
        if(err){
            console.log(err)
        }else{
            console.log(newlyCreated)
            //redirect back to campgrounds page
            res.redirect("/campgrounds") //redirect default as "GET" request!
        }
    })

})

// NEW - Show form to create new campground
router.get("/new", isLoggedIn, (req, res) =>{
    res.render("campgrounds/new")
})

// SHOW - Shows info about one campground
router.get("/:id", (req, res)=> { //should be added under "/camgrounds/new". Otherwise, the "new" keyword will be treated as an ":id"
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
        if(err){
            console.error(err)
        }else{
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

module.exports = router