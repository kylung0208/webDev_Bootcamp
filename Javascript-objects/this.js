dog = {
    name: "Bobby",
    color: "brown",
    word: null,
    speak: function(greetings){
        console.log(greetings + ' ' + this.word)
    }
}


dog.word = "WOOF!"
dog.speak("Hi There~~~")