const { Router } = require("express");

const TagsController = require("../controllers/TagsController");

const TagsRoutes = Router();

const tagsController = new TagsController();

TagsRoutes.get("/", tagsController.index)

module.exports = TagsRoutes;