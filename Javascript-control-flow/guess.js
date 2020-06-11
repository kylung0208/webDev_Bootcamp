const goal = 56
let guess = undefined
let getRight = false

while(true){
    if(guess === undefined){
        guess = Number(prompt('guess a number'))
    }
    else if(guess > goal){
        guess = Number(prompt('too high! guess amother number'))
    }
    else if(guess < goal){
        guess = Number(prompt('too low! guess another number'))
    }
    else if(guess === goal){
        alert('You got me! The number is ' + goal + '!')
        break
    }
    else{
        console.log('[error]guess = ', guess)
        console.log('[error]typeof guess = ', typeof guess)
    }
    console.log('[correct]guess = ', guess)
    console.log('[correct]typeof guess = ', typeof guess)
}
