//Come up with 4 different ways to select the first <p> tag
//1.
var p = document.getElementById('first')
console.log(p)

//2.
var p = document.getElementsByClassName('special')[0]
console.log(p)

//3.
var p = document.getElementsByTagName('p')[0]
console.log(p)

//4.
var p = document.querySelector('#first')
console.log(p)

//5.
var p = document.querySelector('.special')
console.log(p)

//6.
var p = document.querySelector('body p')
console.log(p)

//7. 
var p = document.querySelectorAll('p')[0]
console.log(p)

//8.
var p = document.querySelectorAll('.special')[0]
console.log(p)
