let mongoose = require("mongoose");
const { StringDecoder } = require("string_decoder");

//Connect Mongoose to MongoDB (change the db_name variable if needed!)
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
let db_name = "blog_demo_2"
mongoose.connect("mongodb://localhost:27017/" + db_name)
.then(()=>{console.log("DB Connected!")})
.catch(err => {console.log(`DB Connection Error: ${err.message}`)})

// import from Module.exports file
let Post = require("./models/post")
let User = require("./models/user")



// User.create({
//     email: "Danny@gmail.com",
//     name: "Danny Lung",
//     posts: []
// })


Post.create({
    title: "How to cook the best burger Pt. 4",
    content: "OIHJFORIHGRUHGJODSRHJG"
}, function(err, post){
    User.findOne({email: "Danny@gmail.com"}, function(err, foundUser){
        if(err){
            console.log(err)
        } else {
            foundUser.posts.push(post)
            foundUser.save(function(err, data){
                if(err){
                    console.log(err)
                } else {
                    console.log(data)
                }
            })
        }
    })
})

//Find user
//Find all posts for that user

// User.findOne({email:"Danny@gmail.com"}).populate("posts").exec(function(err, user){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(user)
//     }
// })