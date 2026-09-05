const express = require("express");

const {
  getUsers,
  createUser,
  getUser,
  updateUserStatus,
} = require("../controllers/userController");
// const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
// router.use(authMiddleware);

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.patch("/:id/status", updateUserStatus);

module.exports = router;
