let express = require("express")
let router = express.Router({mergeParams: true})
let Comment = require("../models/comment")
let campground = require("../models/campground")



//====================================================
//COMMENTS ROUTE
//====================================================

router.get("/new", isLoggedIn, function(req, res){
    // find campground by id
    campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else{
            res.render("comments/new", {campground: campground})
        }
    })
})

router.post("/", isLoggedIn, function(req, res){
    //lookup campground using ID
    campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
            res.redirect("/campgrounds")
        } else{
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    //save comment
                    comment.save()
                    //connect new comment to campground
                    campground.comments.push(comment)
                    campground.save()
                    //redirect campground show page "/campground/id"
                    res.redirect("/campgrounds/" + campground._id)
                }
            })
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
