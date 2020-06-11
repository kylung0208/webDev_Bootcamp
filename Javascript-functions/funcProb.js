//1-1.
function isEven(num){
    //this function takes a single numeric argument and returns true 
    //if the number is even, and false otherwise.
    if(typeof num !== "number"){
        return false
    }
    else if(num%2 === 0){
        return true
    }
    else{
        return false
    }
}
//1-2.
function isEvenAlter(num){
    return num%2 === 0
}

console.log('isEven()')
console.log(isEven(1)) //false
console.log(isEven(-10)) //true
console.log(isEven(12)) //true

console.log('isEvenAlter()')
console.log(isEvenAlter(1)) //false
console.log(isEvenAlter(-10)) //true
console.log(isEvenAlter(12)) //true


//2-1.
function factorial(num){
    if(num < 0){
        return false
    }
    if(num === 0){
        return 1
    }
    return Math.floor(num) * factorial(Math.floor(num-1))
}

console.log('factorial()')
console.log('factorial(5)', factorial(5))
console.log('factorial(2)', factorial(2))
console.log('factorial(10)', factorial(10))
console.log('factorial(0)', factorial(0))
console.log('factorial(10.3)', factorial(10.3))// still use factorial(10)

//2-2.
function factorialIter(num){
    if(typeof num !== 'number' || num < 0){
        return false
    }
    num = Math.floor(num)
    if(num === 0){
        return 1
    }
    let result = 1
    for(let i=1; i<=num; i++){
        result *= i
    }
    return result
}

console.log('factorialIter()')
console.log('factorialIter(5)', factorialIter(5))
console.log('factorialIter(2)', factorialIter(2))
console.log('factorialIter(10)', factorialIter(10))
console.log('factorialIter(0)', factorialIter(0))
console.log('factorialIter(10.3)', factorialIter(10.3))// still use fafactorialIter(10)

//3.
function kebabToSnake(str){
    return str.replace(/-/g, '_')
}

console.log('debabToSnake()')
console.log('kebabToSnake("hello-world")', kebabToSnake("hello-world"))
console.log('kebabToSnake("dogs-are-awesome")', kebabToSnake("dogs-are-awesome"))
console.log('kebabToSnake("blah")', kebabToSnake("blah"))


function doMoreMath(x, y){
    x = 1000
    y = 2000
    console.log('y, x = ', y, x)
}
let x = 100
let y = 99


doMoreMath(x, y)
console.log(x)
console.log(y)