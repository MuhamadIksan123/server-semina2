const express = require("express");
const router = express.Router();
const { createCMSOrganizer, createCMSUsers } = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("./../../../middlewares/auth");

router.post(
  "/organizers",
  authenticateUser,
  authorizeRoles('organizer'),
  createCMSOrganizer
);
router.post("/users", authenticateUser, createCMSUsers);

module.exports = router;
