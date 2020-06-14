let numSquares = 6
let colors = []
let pickedColor
let sqrs = document.querySelectorAll('.square')
let colorDisplay = document.getElementById("colorDisplay")
let messageDisplay = document.querySelector('#message')
let h1 = document.querySelector('h1')
let resetButton = document.querySelector('#reset')
let modeBtn = document.querySelectorAll('.mode')

init() 

function init(){
    //mode buttons event listeners
    setUpModeButtons()
    setUpSquares()
    reset()
}

function setUpModeButtons(){
    for(let i=0; i<modeBtn.length; i++){
        modeBtn[i].addEventListener('click', function(){
            modeBtn[0].classList.remove('selected')
            modeBtn[1].classList.remove('selected')
            this.classList.add('selected')
            this.textContent === 'Easy'? numSquares = 3: numSquares = 6
            reset()
    
            //figure out how many sqares to show
            //pick new colors
            //pick a new pickedColor
            //update page to reflect changes
        })
    }
}

function setUpSquares(){
    for(let i=0; i<sqrs.length; i++){
        //add click listeners to squares
        sqrs[i].addEventListener("click", function(){
            //grab color of clicked square
            var clickedColor = this.style.backgroundColor
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!"
                resetButton.textContent = "Play Again?"
                changeColors(clickedColor)
                h1.style.backgroundColor = clickedColor
            }
            else{
                this.style.backgroundColor = "#232323"
                messageDisplay.textContent = "Try Again"
            }
        })
    }
}

function reset(){
    //generate all new colors
    colors = generateRandomColors(numSquares)
    //pick a new random color from array
    pickedColor = pickColor()
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor
    //change colors of squares
    for(let i=0; i<sqrs.length; i++){
        if(colors[i]){
            sqrs[i].style.display = 'block'
            sqrs[i].style.backgroundColor = colors[i]
        }else{
            sqrs[i].style.display = "none"
        }
    }
    h1.style.backgroundColor = 'steelblue'
    resetButton.textContent = 'New Colors'
    messageDisplay.textContent = ''
}

// easyBtn.addEventListener('click', function(){
//     easyBtn.classList.add('selected')
//     hardBtn.classList.remove('selected')
//     numSquares = 3
//     colors = generateRandomColors(numSquares)
//     pickedColor = pickColor()
//     colorDisplay.textContent = pickedColor
//     for(let i=0; i<sqrs.length; i++){
//         if(colors[i]){
//             sqrs[i].style.backgroundColor = colors[i]
//         }
//         else{
//             sqrs[i].style.display = 'none'
//         }
//     }
//     h1.style.backgroundColor = '#steelblue'
//     resetButton.textContent = 'New Colors'
//     messageDisplay.textContent = ''
// })

// hardBtn.addEventListener('click', function(){
//     hardBtn.classList.add('selected')
//     easyBtn.classList.remove('selected')
//     numSquares = 6
//     colors = generateRandomColors(numSquares)
//     pickedColor = pickColor()
//     colorDisplay.textContent = pickedColor
//     for(let i=0; i<sqrs.length; i++){
//         if(colors[i]){
//             sqrs[i].style.backgroundColor = colors[i]
//         }
//         sqrs[i].style.display = 'block'
//     }
//     h1.style.backgroundColor = 'steelblue'
//     resetButton.textContent = 'New Colors'
//     messageDisplay.textContent = ''
// })

resetButton.addEventListener("click", function(){
    // //generate all new colors
    // colors = generateRandomColors(numSquares)
    // //pick a new random color from array
    // pickedColor = pickColor()
    // //change colorDisplay to match picked Color
    // colorDisplay.textContent = pickedColor
    // //change colors of squares
    // for(let i=0; i<sqrs.length; i++){
    //     sqrs[i].style.backgroundColor = colors[i]
    // }
    // h1.style.backgroundColor = 'steelblue'
    // resetButton.textContent = 'New Colors'
    // messageDisplay.textContent = ''
    reset()
})



function changeColors(color){
    //loop thorugh all squares
    for(let i=0; i<sqrs.length; i++){
        sqrs[i].style.backgroundColor = color;
    }
}

function pickColor(){
    let random = Math.floor(Math.random() * colors.length)
    return colors[random]
}

function generateRandomColors(num){
    //make an array
    let arr = []
    //add num random colors to array
    for(let i=0; i<num; i++){
        //get random color and push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr
}

function randomColor(){
    //pick a "red" from 0-255
    let r = Math.floor(Math.random()*256)
    //pick a "green" from 0-255
    let g = Math.floor(Math.random()*256)
    //pick a "blue" from 0-255
    let b = Math.floor(Math.random()*256)
    return `rgb(${r}, ${g}, ${b})`
}