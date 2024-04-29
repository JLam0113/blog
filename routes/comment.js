const express = require("express");
const router = express.Router();
const comment_controller = require("../controllers/commentController")

router.post("/", comment_controller.create);

router.post("/:id/update", comment_controller.update);

module.exports = router;