let movieDB = []

movieDB.push({
    title: "In Bruges",
    rating: 5,
    hasWatched: true
})
movieDB.push({
    title: "Frozen",
    rating: 4.5,
    hasWatched: false
})
movieDB.push({
    title: "1917",
    rating: 4.8,
    hasWatched: true
})
movieDB.push({
    title: "Les Miserables",
    rating: 3.5,
    hasWatched: false
})

printAllMovies(movieDB)

function printAllMovies(movies){
    movies.forEach(movie => {
        console.log(buildString(movie))
    });
}

function buildString(movie){
    let result = 'You have '
    if(movie.hasWatched == true){
        result += 'seen '
    }
    else{
        result += 'not seen'
    }
    result += movie.title + '" - ' + movie.rating + ' stars'
    return result
}



