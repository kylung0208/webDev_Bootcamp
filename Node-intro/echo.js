//ECHO ECERCISE

//Using the command line, create a file "echo.js"
//Inside the pfile, write a function named echo that takes 2 arguments: a string and a number
//It should print out hte string, number number of times.

echo("Echo!!!", 10) //should print "ECHO!!!" 10 times
echo("Tater Tots", 3) //should print "Tater Tots" 3 times

function echo(str, num){
    for(let i=0; i<num; i++){
        console.log(str)
    }
}