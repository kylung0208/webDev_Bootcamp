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

//requiring routes
let commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")

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
// seedDB() //seed the database

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

app.use(function(req, res, next){//limited to views/ directory
    res.locals.currentUser = req.user
    // middleware => need to add next() to exec the next code snippets.
    // Otherwise, the program will just stop.
    next()
})

//ROUTES
app.use('/', indexRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/comments', commentRoutes)

app.listen(3000, function(){
    console.log("YelpCamp server started!!")
})