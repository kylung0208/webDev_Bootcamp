let express                 = require("express"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose")



let app = express()
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}))

//Connect Mongoose to MongoDB
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
let db_name = "auth_demo_app"
mongoose.connect("mongodb://localhost:27017/" + db_name)
.then(()=>{console.log("DB Connected!")})
.catch(err => {console.log(`DB Connection Error: ${err.message}`)})

app.use(passport.initialize())
app.use(passport.session())

//use bodyParser
app.use(bodyParser.urlencoded({extended: true})) 

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



//=========================================================
//ROUTES
//=========================================================
app.get("/", function(req, res){
    res.render("home")
})

app.get("/secret", isLoggedIn, function(req, res){
    res.render("secret")
})


//Auth Routes

//show sign up form
app.get("/register", function(req, res){
    res.render("register")
})
//handling user sign up
app.post("/register", function(req, res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err)
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret")
        })
    })
})

//LOGIN Routes
//render login form
app.get("/login", function(req, res){
    res.render("login")
})
//login logic
//$ middleware (passport.authenticate() is not in the first callback, instead, it lies in the second argument of the POST request)
app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){
})

//Logout Route
app.get("/logout", function(req, res){
    req.logout()
    res.redirect('/')
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

app.listen(3000, function(){
    console.log("server started!")
})