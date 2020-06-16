let app = require('express')()


// Route 1
app.get('/', function(req, res){
    console.log('Route 1: The ROOT!')
    res.send('Hi there, welcome to my assignment!')
})

// Route 2
app.get('/speak/:animal', function(req, res){
    console.log('Route 2: The animal noise')
    let animal = req.params.animal.toLowerCase()
    let animal_noise = {
        pig: 'Oink',
        cow: 'Moo',
        dog: 'Woof Woof'
    }
    if(animal === 'pig' || animal === 'cow' || animal === 'dog'){
        res.send("The " + animal + " says '" + animal_noise[animal] + "'")
    }else{
        res.send('Sorry, page not found...Whare are you doing with your life?')
    }
})

// Route 3
app.get('/repeat/:words/:repNum', function(req, res){
    console.log('Route 3: The repeat words')
    let words = req.params.words
    let repNum = Number(req.params.repNum) //turn String into Number
    console.log(repNum)
    console.log(typeof repNum)

    if(!repNum){
        res.send('Sorry, page not found...Whare are you doing with your life?')
    }

    let output = '';
    for(let i=0; i<repNum; i++){
        output += words+' '
    }
    res.send(output)
})

//Else Route
app.get('*', function(req, res){
    console.log('Other Routes')
    res.send('Sorry, page not found...What are you doing with your life?')
})



//Tell Express to listen for requests (start server)
app.listen(3000, function(){
    console.log('server has started!, PORT = ', this.address().port)
})