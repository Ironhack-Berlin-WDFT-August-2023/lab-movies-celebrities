// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/movies/create", (req, res, next) => {
    Celebrity.find()
    .then(dataFromDB => {
        res.render("movies/new-movie", {celebrities: dataFromDB})
    })
    .catch(err => console.log(err))
});

router.post("/movies/create", (req, res, next) => {
    const { title, genre, plot, cast } = req.body

    Movie.create({
        title, 
        genre,
        plot,
        cast
    })
    .then(createdMovie => {
        res.redirect("/movies")
    })
    .catch(err => res.render("movies/new-movie"))
});

// Iteration #7

router.get("/movies", (req, res, next) => {
    Movie.find()
    .then(dataFromDB => {
        res.render("movies/movies", {movies: dataFromDB})
    })
})

// Iteration #8

router.get("/movies/:id", (req, res, next) => {
    const movieId = req.params.id;

    Movie.findById(movieId)
    .populate("cast")
    .then(movie => {
        res.render("movies/movie-details", { movie })
    })
    .catch(err => {
        console.log(err)
    })
});

// Iteration #9

router.post("/movies/:id/delete", (req, res, next) => {
    const movieId = req.params.id;

    Movie.findByIdAndRemove(movieId)
    .then(deletedMovie => {
        res.redirect("/movies")
    })
    .catch(err => next(err))
})

// Iteration #10

router.get("/movies/:id/edit", async (req, res, next) => {
    const id = req.params.id

    try {
        const movie = await Movie.findById(id).populate("cast")
        const celebrities = await Celebrity.find()
        const celebritiesNotInCast = filterCelebritiesNotInCast(movie, celebrities)

        res.render("movies/edit-movie", { movie, celebritiesNotInCast })
    } catch (error) {
        console.log(error)
    }
})

router.get("/movies/:id/edit", (req, res, next) => {
    const movieId = req.params.id;
    const { title, genre, plot, cast } = req.body

    const editedMovie = {
        title,
        genre,
        plot,
        cast
    }

    Movie.findById(movieId, editedMovie)
    .then(movie => {
        res.redirect(`/movies/${id}`)
    })
    .catch(err => next(err))
})

function filterCelebritiesNotInCast(movie, celebrities) {
    return celebrities.filter(celebrity => {
        movie.cast.forEach(movieCelebrity => {
            if (movieCelebrity.name === celebrity.name) {
                return false
            }
        })
        return true
    })
}
 
module.exports = router;