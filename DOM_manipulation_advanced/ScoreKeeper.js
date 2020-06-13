let p1Display = document.querySelector('#p1Display')
let p2Display = document.querySelector('#p2Display')
let numInput = document.querySelector('input[type="number"]')
let winningScoreDisplay = document.querySelector('p span')
let p1btn = document.querySelector('#p1')
let p2btn = document.querySelector('#p2')
let resetbtn = document.querySelector('#reset')
let p1Score = 0
let p2Score = 0
let gameOver = false
let winningScore = 5

p1btn.addEventListener("click", function(){
    if(!gameOver){
        p1Score++
        if(p1Score === winningScore){
            p1Display.classList.add('winner')
            console.log('GAME OVER! P1 Wins.')
            gameOver = true
        }
        p1Display.textContent = p1Score
    }
})
p2btn.addEventListener("click", function(){
    if(!gameOver){
        p2Score++
        if(p2Score === winningScore){
            p2Display.classList.add('winner')
            console.log('GAME OVER!, P2 Wins.')
            gameOver = true
        }
        p2Display.textContent = p2Score
    }
})

resetbtn.addEventListener("click", function(){
    reset()
})

function reset(){
    //p1
    p1Score = 0
    p1Display.classList.remove('winner')
    p1Display.textContent = p1Score
    //p2
    p2Score = 0
    p2Display.textContent = p2Score
    p2Display.classList.remove('winner')

    gameOver = false
}

numInput.addEventListener('change', function(){
    val = Number(this.value)
    winningScoreDisplay.textContent = val
    winningScore = val
    reset()
})