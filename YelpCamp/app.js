const campground = require("./models/campground");

let express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Campgounrd  = require("./models/campground"),
    Comment     = require("./models/comment"),
    User        = require("./models/user"),
    seedDB      = require("./seeds")

//Connect Mongoose to MongoDB
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp")
.then(()=>{console.log("DB Connected!")})
.catch(err => {console.log(`DB Connection Error: ${err.message}`)})


app.use(bodyParser.urlencoded({extended: true})) //use bodyParser
app.set("view engine", "ejs")
app.use(express.static(__dirname+ "/public"))


//everytime restarts the server
seedDB()

//Passport Configuration
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
    res.locals.currentUser = req.user
    // middleware => need to add next() to exec the next code snippets.
    // Otherwise, the program will just stop.
    next()
})

//HOME - Landing Page
app.get("/", (req, res)=>{
    res.render("landing")
})

//INDEX - Show all campgrounds
app.get("/campgrounds", (req, res) => {
    //Get all campgorounds from DB
    Campgounrd.find({}, function(err, allCampgrounds){
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
app.post("/campgrounds", (req, res) => {
    //get data from form and add to campgrounds DB
    let name = req.body.name
    let image = req.body.image
    let description = req.body.description
    let newCampground = {
        name: name,
        image: image,
        description: description,
    }
    //Create a new campground and save to DB
    Campgounrd.create(newCampground, (err, newlyCreated)=>{
        if(err){
            console.log(err)
        }else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds") //redirect default as "GET" request!
        }
    })

})

// NEW - Show form to create new campground
app.get("/campgrounds/new", (req, res) =>{
    res.render("campgrounds/new")
})

// SHOW - Shows info about one campground
app.get("/campgrounds/:id", (req, res)=> { //should be added under "/camgrounds/new". Otherwise, the "new" keyword will be treated as an ":id"
    //find the campground with provided ID
    Campgounrd.findById(req.params.id).populate("comments").exec((err, foundCampground)=>{
        if(err){
            console.error(err)
        }else{
            console.log(foundCampground)
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground})
        }
    })
})



//====================================================
//COMMENTS ROUTE
//====================================================

app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    // find campground by id
    campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err)
        } else{
            res.render("comments/new", {campground: campground})
        }
    })
})

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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


//====================================================
//AUTH ROUTE
//====================================================
app.get("/register", function(req, res){
    res.render("register")
})

//handle sign up logic
app.post("/register", function(req, res){
    let newUser = new User({username: req.body.username})
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds")
        })
    })
})

//Show login form
app.get("/login", function(req, res){
    res.render("login")
})

//handle login logic
app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){
    
})

//Logout route
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds")
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

app.listen(3000, function(){
    console.log("YelpCamp server started!!")
})