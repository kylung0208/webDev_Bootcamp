//* request using nodeJS --> through a package called "request"
//* How to install: npm install request --save

const request = require('request');
request('https://jsonplaceholder.typicode.com/users/1', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage. (Type: String)

  let parsedData = JSON.parse(body) //parse a String (body) into JSON format (javascript object).
  console.log(`${parsedData.name}'s email is ${parsedData.email}, and ${parsedData.name} lives in ${parsedData.address.city}. (zipcode: ${parsedData.address.zipcode}) `)
});

// request('http://www.googlewoiejf.com', function(error, response, body){
//     if(error){
//         console.log('SOMETHING WENT WRONG!')
//         console.error(error)
//     }else{
//         if(response.statusCode == 200){
//             //Things worked!
//             console.log(body)
//         }
//     }
// })