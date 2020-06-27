let express = require("express")
let router = express.Router({mergeParams: true})
let Campground = require("../models/campground")
let middleware = require("../middleware") //automatically require the "index.js" file in the directory.

//INDEX - Show all campgrounds
router.get("/", function(req, res){
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
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to campgrounds DB
    let name = req.body.name
    let price = req.body.price
    let image = req.body.image
    let description = req.body.description
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampground = {
        name: name,
        price: price,
        image: image,
        description: description,
        author: author
    }
    //Create a new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
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
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new")
})

// SHOW - Shows info about one campground
router.get("/:id", function(req, res){ //should be added under "/camgrounds/new". Otherwise, the "new" keyword will be treated as an ":id"
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.error(err)
        }else{
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
})

//Edit campground route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground})
    })
})

//update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            res.redirect("/campgrounds")
        } else {
            //refirect somewhere(show page)
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

//DESTROY CAMPGROUND ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, async(req, res)=>{
    // also removes all comments in the corresponding campground.
    try {
        let foundCampground = await Campground.findById(req.params.id);
        await foundCampground.remove();
        res.redirect("/campgrounds");
      } catch (error) {
        console.log(error.message);
        res.redirect("/campgrounds");
    }
    // Campground.findByIdAndRemove(req.params.id, function(err){
    //     if(err){
    //         res.redirect("/campgrounds")
    //     } else {
    //         res.redirect("/campgrounds")
    //     }
    // })
})


module.exports = router