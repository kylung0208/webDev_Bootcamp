//click()
$('h1').click(function(){
    alert('h1 has been clicked!')
})

$('button').click(function(){
    $(this).css('backgroundColor', 'pink')
    let text = $(this).text()
    console.log('You clicked ' + text)
})

//keypress()
$('input[type="text"]').keypress(function(event){
    if(event.which === 13){
        alert('You hit enter!')
    }
})

//on() --> works just like addEventListener() in DOM manipulation
$('h1').on('click', function(){
    $(this).css('color', 'purple')
})

$('input').on('keypress', function(){
    console.log('keypressed')
})

$('button').on('mouseenter', function(){
    //console.log('mouse enter')
    $(this).css('font-weight', 'bold')
})
$('button').on('mouseleave', function(){
    //console.log('mouse enter')
    $(this).css('font-weight', 'normal')
})