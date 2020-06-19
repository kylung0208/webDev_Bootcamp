let mongoose = require("mongoose")
//connect to the database
// mongoose.connect("mongodb://localhost/cat_app", {useNewUrlParser: true, useNewUrlParser: true, useUnifiedTopology: true})
// .then(()=> console.log("DB Connected!"))
// .catch(err => {console.log(`DB Connection Error: ${err.message}`)})

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/cat_app")
.then(()=>{console.log("DB Connected!")})
.catch(err => {console.log(`DB Connection Error: ${err.message}`)})

let catSchema = new mongoose.Schema({
    name: String, 
    age: Number,
    temperament: String
})

let Cat = mongoose.model("Cat", catSchema)

//adding a new cat to the DB
//*create cat instances
// let george = new Cat({
//                 name: "George",
//                 age: 11,
//                 temperament: "Grouchy"
//             })
// let Norris = new Cat({
//     name: "Ms. Norris",
//     age: 7,
//     temperament: "Evil"
// })

//*save cats to the DB
// george.save(catDebugger)
// Norris.save(catDebugger)

//* Do "create instances" + "save instances to DB" at once! ==> Use .create() method
Cat.create({
    name: "Snow White",
    age: 15,
    temperament: "bland"
}, catDebugger)

function catDebugger(err, cat){
    if(err){
        console.log("Something went wrong!!")
        console.error(err)
    }
    else{
        console.log("We just saved a cat to the DB!")
        console.log(cat)
    }
}

//retrieve all cats from the DB and console.log each one

Cat.find({}, findCatsDebugger)

function findCatsDebugger(err, cats){
    if(err){
        console.log("OH NO, ERROR!!")
        console.error(err)
    }
    else{
        console.log("ALL THE CATS.....")
        console.log(cats)
    }
}