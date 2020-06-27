let express = require("express")
let router = express.Router({mergeParams: true})
let Comment = require("../models/comment")
let campground = require("../models/campground")



//====================================================
//COMMENTS ROUTE
//====================================================
//COMMENTS NEW ROUTE
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

//COMMENTS CREATE ROUTE
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

//COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back")
        } else{
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment})
        }
    })
})

//COMMENTS UPDATE ROUTE
router.put("/:comment_id", checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
        }
    })
})

//COMMENTS DESTROY ROUTE
router.delete("/:comment_id", checkCommentOwnership, function(req, res){
    //findByIdAndRemove()
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/" + req.params.id)
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

function checkCommentOwnership(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
        
            if(err){
                res.redirect("back")
            } else {
                //does user own the comment
                if(foundComment.author.id.equals(req.user._id)){
                    //should use the mongoose built-in equals() to compare types "mongoose object" to "String"
                    //Cannot use "==="
                    next()
                }
                else {
                    //otherwise, redirect
                    res.redirect("back")
                }
            }
        }
    )}
    else {
    //if not, redirect
    res.redirect("back")
    }
}


module.exports = router
