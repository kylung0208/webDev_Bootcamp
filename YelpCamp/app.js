let express = require("express")
let app = express()
let bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true})) //use bodyParser
app.set("view engine", "ejs")


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

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {campgrounds: campgrounds})
})

app.post("/campgrounds", (req, res) => {
    //get data from form and add to campgrounds array
    let name = req.body.name
    let image = req.body.image
    let newCampground = {
        name: name,
        image: image,
    }
    campgrounds.push(newCampground)
    //redirect back to campgrounds page
    res.redirect("/campgrounds") //redirect default as "GET" request!

})

app.get("/campgrounds/new", (req, res) =>{
    res.render("new")
})

app.listen(3000, function(){
    console.log("YelpCamp server started!!")
})