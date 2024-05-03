const { Router } = require("express");


// Importandos as rotas
const usersRouter = require("./users.routes")
const moviesNotesRouter = require("./moviesNotes.routes")
const tagsRouter = require("./tags.routes")

// Criando um módulo para ler as rotas
const routes = Router();

// Fazendo a leitura das rotas
routes.use("/users", usersRouter)
routes.use("/notes", moviesNotesRouter)
routes.use("/tags", tagsRouter)

// exportando as rotas
module.exports = routes;