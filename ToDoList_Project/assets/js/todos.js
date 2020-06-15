//check off specific todos by clicking
$('ul').on('click', 'li', function(){
    // //if li is gray
    // if($(this).css('color') === 'rgb(128, 128, 128)'){
    //     //turn it black
    //     $(this).css({
    //         'text-decoration': 'none', //or textDecoration: "line-through", with NO quoattion mark
    //         'color': 'black'
    //     })
    // }
    // //else
    // else{
    //     //turn it gray
    //     $(this).css({
    //         'text-decoration': 'line-through', //or textDecoration: "line-through", with NO quoattion mark
    //         'color': 'gray'
    //     })
    // }

    $(this).toggleClass('completed')
})

//Click on X to delete To-Do
$('ul').on('click', 'span', function(event){
    //remove the whole li, using the fadeOut() function instead of directly remove()
    $(this).parent().fadeOut(500, function(){
        $(this).remove() //this $(this) refers to the <li>, which is $(this).parent() before calling the fadeOut() function
    })
    event.stopPropagation() //stop bubbling up to its parent elements (or ancestors...)
})

$('input[type=\'text\']').keypress(function(event){
    if(event.which === 13){
        let todoText = $(this).val()
        $(this).val("")
        //create a new li and add to ul
        $('ul').append("<li><span><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span> " + todoText + "</li>")
    }
})

$('.fa-plus').click(function(){
    $('input[type="text"]').fadeToggle()
})