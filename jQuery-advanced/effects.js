$('button').on('click', function(){
    //fadeOut(), fadeIn(), fadeToggle()
    $('div').fadeOut(1000, function(){
        //(this).remove()
            //*should be add in this callback function to ensure this line 
            //* is being executed after the fadeOut effect!!!
            //*Otherwise, JS won't wait for the fadeout effect ends,
            //*the button will be instantly removed! (Then NO FADEOUT effect is seen)
    })
    //slideDown(), slideUp(), slideToggle()
    $('div').slideDown()
})
