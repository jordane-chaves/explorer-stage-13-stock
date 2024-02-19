const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.get("/profile", ensureAuthenticated, usersController.index);
usersRoutes.post("/", usersController.create);

module.exports = usersRoutes;