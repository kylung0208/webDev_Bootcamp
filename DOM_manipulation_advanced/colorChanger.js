let btn = document.querySelector('button')
let bg_default = document.body.style.background

btn.addEventListener("click", function(){
    //*Approach 1
    // if(document.body.style.background === bg_default){
    //     document.querySelector('body').style.background = 'purple'
    // }
    // else{
    //     document.querySelector('body').style.background = bg_default
    // }

    //*Approach 2
    //document.body.style.background = 'purple'

    //*Approach 3 (using toggle CSS class .purple)
    document.body.classList.toggle('purple')
})