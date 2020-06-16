let scores = [90, 98, 89, 100, 100, 86, 94]
average(scores)

let scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49]
average(scores2)

function average(arr){
    let sum = 0
    arr.forEach(score => {
        sum += score
    });
    console.log(Math.round(sum/arr.length))
}