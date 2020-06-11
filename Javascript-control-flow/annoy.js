while(true){
    let ans = prompt('Are we there yet?')
    ans = ans.toLowerCase()

    if(ans.indexOf('yes') !== -1){
        alert('Nice! we get there.')
        break
    }
}

// Another approach
// let answer = prompt('are we there yet?')

// while(answer !== 'yes'){
//     answer = prompt('are we there yet?')
// }

// alert('YAY! we made it.')