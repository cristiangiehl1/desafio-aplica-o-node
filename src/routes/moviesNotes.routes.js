const { Router } = require("express");

const MoviesNotesController = require("../controllers/MoviesNotesController")

const MoviesNotesRoutes = Router();

const moviesNotesController = new MoviesNotesController();

MoviesNotesRoutes.get("/", moviesNotesController.index)
MoviesNotesRoutes.post("/", moviesNotesController.create)
MoviesNotesRoutes.get("/", moviesNotesController.show)
MoviesNotesRoutes.delete("/", moviesNotesController.delete)

module.exports = MoviesNotesRoutes;