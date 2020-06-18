let express = require("express")
let app = express()
let request = require("request")

app.set("view engine", "ejs")

app.get('/', (req, res) => {
    res.render("search")
})

app.get("/results", (req, res) => {
    // console.log(req)
    let searchItem = req.query.search
    let URL = 'http://www.omdbapi.com/?s='+ searchItem +'&apikey=thewdb'
    request(URL , (error, response, body)=>{
        if(!error && response.statusCode == 200){
            let parsedData = JSON.parse(body)
            // res.send(parsedData.Search[0].Title)
            console.log(typeof parsedData)
            console.log(parsedData["Error"])
            if(parsedData["Error"]){
                res.send("Sorry, no movie found! <a href=\"/\">Search Again!</a>")
            }else{
                res.render("results", {data: parsedData})
            }
        }
    })
})

app.listen(3000, function(){
    console.log("Movie App has started!!!")
})
