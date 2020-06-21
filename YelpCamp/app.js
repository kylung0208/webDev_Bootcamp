let express = require("express")
let app = express()
let bodyParser = require("body-parser")
let mongoose = require("mongoose")

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


//SCHEMA SETUP
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
})
let Campgounrd = mongoose.model("Campground", campgroundSchema)

//Callback function for debugging
function campgroundDebugger(err, CG){
    if(err){
        console.log("Something went wrong!!")
        console.error(err)
    }
    else{
        console.log("We just saved a campground to the DB!")
        console.log(CG)
    }
}

// // create a campround and save to the DB
// Campgounrd.create(
//     {
//         name: "Coffee on Wood", 
//         image: "https://images.pexels.com/photos/1239422/pexels-photo-1239422.jpeg?auto=compress&cs=tinysrgb&h=350",
//         description: "This is a cup of coffee on a nicely placed wood. It tastes good."
//     }
//     , campgroundDebugger)

let campgrounds = [
    {name: "Salmon Creek", image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Granite Hill", image: "https://images.pexels.com/photos/1239422/pexels-photo-1239422.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Salmon Creek", image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Granite Hill", image: "https://images.pexels.com/photos/1239422/pexels-photo-1239422.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Salmon Creek", image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Granite Hill", image: "https://images.pexels.com/photos/1239422/pexels-photo-1239422.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Salmon Creek", image: "https://images.pexels.com/photos/1230302/pexels-photo-1230302.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Granite Hill", image: "https://images.pexels.com/photos/1239422/pexels-photo-1239422.jpeg?auto=compress&cs=tinysrgb&h=350"},
    {name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/712067/pexels-photo-712067.jpeg?auto=compress&cs=tinysrgb&h=350"},
]


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
            res.render("index", {campgrounds: allCampgrounds})
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
    res.render("new")
})

// SHOW - Shows info about one campground
app.get("/campgrounds/:id", (req, res)=> { //should be added under "/camgrounds/new". Otherwise, the "new" keyword will be treated as an ":id"
    //find the campground with provided ID
    Campgounrd.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            console.error(err)
        }else{
            //render show template with that campground
            res.render("show", {campground: foundCampground})
        }
    })
})

app.listen(3000, function(){
    console.log("YelpCamp server started!!")
})