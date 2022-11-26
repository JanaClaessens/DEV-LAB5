const express = require("express"); 
const router = express.Router();
const messageController = require("../controllers/message");

// /api/v1/messages
router.get("/", messageController.getAll);
router.get("/:id", messageController.getById);
router.post("/", messageController.create);

module.exports = router;