let express = require('express')
let app = express()

// "/" => "Hi there!"
app.get("/", function(req, res){
    console.log('someone make a request to /')
    res.send("Hi there!")
})
// "/bye" => "Goodbye!"
app.get('/bye', function(req, res){
    console.log('someone make a request to /bye')
    res.send('Goodbye')
})
// "/dog" => "MEOW!"
app.get('/dog', function(req, res){
    console.log('someone make a request to /dog')
    res.send('MEOW!!')
})
// "/r/:subreddit" ==> use ":" to match pattern
app.get('/r/:subredditName', function(req, res){
    console.log('someone make a request to /r/:subreddit')
    let subreddit = req.params.subredditName
    res.send('Welcome to ' + subreddit + ' subreddit!!')
})
// "/r/:subreddit/comments/:id/:title" ==> use ":" to match pattern
app.get('/r/:subredditName/comments/:id/:title', function(req, res){
    console.log(req.params)
    let subreddit = req.params.subredditName
    let subredditId = req.params.id
    let subredditTitle = req.params.title
    console.log(`someone make a request to /r/:${subreddit}/comments/${subredditId}/${subredditTitle}`)
    res.send(`Welcome to the comment page on reddit!! /r/:${subreddit}/comments/${subredditId}/${subredditTitle}`)
})
//any other route
app.get('*', function(req, res){
    console.log('someone make a request to other page')
    res.send('You are a star!!')
})


//Tell Express to listen for requests (start server)
app.listen(3000, function(){
    console.log('server has started!, PORT = ', this.address().port)
})