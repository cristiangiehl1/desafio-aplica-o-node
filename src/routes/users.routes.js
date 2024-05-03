const { Router } = require("express")

const UsersController = require("../controllers/UserControllers")

const usersRoutes = Router()

const usersController = new UsersController();

usersRoutes.post("/", usersController.create)
usersRoutes.delete("/", usersController.delete)
usersRoutes.put("/", usersController.update)

module.exports = usersRoutes;