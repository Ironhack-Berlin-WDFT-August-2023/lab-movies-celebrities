// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

// Iteration #4

router.get("/celebrities/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/celebrities/create", (req, res, next) => {
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.create({
        name,
        occupation,
        catchPhrase
    })
    .then(createdCelebrity => {
        res.redirect("/celebrities")
    })
    .catch(err => {
        res.render("celebrities/new-celebrity")
    })
})

router.get("/celebrities", (req, res, next) => {
    Celebrity.find()
    .then(data => {
        res.render("celebrities/celebrities", {celebrities: data})
    })
    .catch(err => console.log(err))
})

module.exports = router;