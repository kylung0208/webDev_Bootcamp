let app = require('express')()

app.get('/', function(req, res){
    res.render("home.ejs")
    // res.send('<h1>Welcome to the home page!</h1><h2>blah blah blah</h2>')
})

app.listen(3000, function(){
    console.log('Server is listening!')
})