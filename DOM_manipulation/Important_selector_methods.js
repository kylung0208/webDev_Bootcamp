//1. getElementById(): Takes a string argument and returns the one elemenet with a matching ID
let tag = document.getElementById("highlight")
console.log(tag)


//2. getElementsByClassName(): Takes a string argument and returns a list of elements that have a matching class.
let tags_byClassName = document.getElementsByClassName("bolded")
console.log(tags_byClassName) //HTMLcollection


//3. getElementsByTagName(): Returns a list of all elements of a given tag name, like <li> or <h1>
let tags_byTagName = document.getElementsByTagName("li")
console.log(tags_byTagName)


//4. querySelector(): Returns the first element that matches a given CSS-style selector.
let tags_qSelector = document.querySelector("#highlight")
console.log(tags_qSelector)
let tags_qSelector_2 = document.querySelector(".bolded")
console.log(tags_qSelector_2) // gives the very first one...
let h1 = document.querySelector('h1')
console.log(h1)


//5. querySelectorAll(): Returns a list of elements taht matches a given CSS-style selector
let tags_qSelectorAll = document.querySelectorAll(".bolded")
console.log(tags_qSelectorAll) //Nodelist