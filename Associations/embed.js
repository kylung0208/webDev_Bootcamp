let mongoose = require("mongoose");
const { StringDecoder } = require("string_decoder");

//Connect Mongoose to MongoDB (change the db_name variable if needed!)
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
let db_name = "blog_demo"
mongoose.connect("mongodb://localhost:27017/" + db_name)
.then(()=>{console.log("DB Connected!")})
.catch(err => {console.log(`DB Connection Error: ${err.message}`)})


// POST - title, content
let postSchema = new mongoose.Schema({
    title: String,
    content: String
})
let Post = mongoose.model("Post", postSchema)

// USER - email, name
let userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
})
let User = mongoose.model("User", userSchema)



// let newUser = new User({
//     email: "hermione@hogwarts.edu",
//     name: "Hermione Granger"
// })

// newUser.posts.push({
//     title: "How to bre plyjuice potion?",
//     content: "Just kidding. Go to potions class to learn it."
// })
// newUser.save(function(err, user){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(user)
//     }
// })

// let newPost = new Post({
//     title: "Reflections on Apples",
//     content: "They are delicious"
// })
// newPost.save(function(err, post){
//     if(err){
//         console.log(err)
//     } else {
//         console.log(post)
//     }
// })


User.findOne({name: "Hermione Granger"}, function(err, user){
    if(err){
        console.log(err)
    } else {
        user.posts.push({
            title: "3 Things I really hate.",
            content: "Voldemort. Voldemort. Voldemort."
        })
        user.save(function(err, user){
            if(err){
                console.log(err)
            } else {
                console.log(user)
            }
        })
    }
})