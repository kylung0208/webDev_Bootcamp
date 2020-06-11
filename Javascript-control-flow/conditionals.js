let age = prompt('How old are you?')
console.log(typeof age)
age = Number(age)
console.log(typeof age)


let ageRoot = Math.sqrt(age)
console.log('ageRoot = ', ageRoot)
let ageRootFloor = Math.floor(ageRoot)
console.log('ageRootFloor = ', ageRootFloor)


if(age <= 0){
    console.log('error! your age should be a positive number.')
}
else if(age == 21){
    console.log('happy 21st birthday!!')
}
else if((ageRoot - ageRootFloor) === 0){
    //another solution
    // if(age % Math.sqrt(age) === 0){console.log('perfect sqare!')}
    console.log('perfect square!')
}
else if(age % 2 == 1){
    console.log('your age is odd!')
}
else{
    console.log('your age is '+ age + '. cool.')
}