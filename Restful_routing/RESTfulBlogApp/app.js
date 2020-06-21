let bodyParser       = require("body-parser"),
    methodOverride   = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    mongoose         = require("mongoose"),
    express          = require("express"),
    app              = express();

//Connect Mongoose to MongoDB (change the db_name variable if needed!)
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
let db_name = "restful_blog_app"
mongoose.connect("mongodb://localhost:27017/" + db_name)
.then(()=>{console.log("DB Connected!")})
.catch(err => {console.log(`DB Connection Error: ${err.message}`)})

//use bodyParser and set "view engine" to ejs.
app.use(bodyParser.urlencoded({extended: true})) //use bodyParser
app.set("view engine", "ejs")

//use "public" directory as our express style sheet folder.
app.use(express.static("public"))
// use method override "_method"
app.use(methodOverride("_method"))
// use Express-Sanitizer (goes below body-parser)
app.use(expressSanitizer())
//===============================S E T U P D O N E==================================


//Mongoose Schema/MODEL CONFIG
    //title
    //image
    //body
    //created
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: 
        {
            type: Date, 
            default: Date.now
        }
})
let Blog = mongoose.model("Blog", blogSchema)

// Blog.create({
//     title: "Test Blog", 
//     image: "https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80",
//     body: "HELLO THIS IS A BLOG POST!"
// })

//RESTful Routes

app.get("/", function(req, res){
    res.redirect("/blogs")
})
//INDEX ROUTE
app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.error(err)
        }else{
            res.render("index", {blogs: blogs})
        }
    })
})
//NEW ROUTE
app.get("/blogs/new", function(req, res){
    res.render("new")
})
//CREATE ROUTE
app.post('/blogs', function(req, res){
    //create blog
    req.body.blog.body = req.sanitize(req.body.blog.body)
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new")
        }else{
            //then, redirect to the index
            res.redirect("/blogs")
        }
    })
})
//SHOW ROUTE
app.get("/blogs/:id", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs")
        }else{
            res.render("show", {blog: foundBlog})
        }
    })
})
//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res){
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect("/blogs")
        }
        else{
            res.render("edit", {blog: foundBlog})
        }
    })
})
//UPDATE ROUTE
app.put("/blogs/:id", function(req, res){
    req.body.blog.body = req.sanitize(req.body.blog.body)
    //findByIdAndUpdate(id, newData, callback)
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs")
        }else{
            res.redirect("/blogs/" + req.params.id)
        }
    })
})
//DELETE ROUTE
app.delete("/blogs/:id", function(req, res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs")
        }
        else{
            //redirect somewhere
            res.redirect("/blogs")
        }
    })
})


//listen
app.listen(3000, function(){
    console.log("RESTFUL Blog Server is running!")
})