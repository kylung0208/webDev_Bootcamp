
//*The first syntax
// The arguments are in a specific order:
// - The first one represents each element in the array (per loop iteration) that .forEach was called on.
// - The second represents the index of said element.
// - The third represents the array that .forEach was called on (it will be the same for every iteration of the loop).
[1,2,3].forEach(function(el, i, arr) {
    console.log(el, i, arr);
});

//*The second syntax
function logNums(el, i, arr) {
  console.log(el, i, arr);
}
 
[1,2,3].forEach(logNums);