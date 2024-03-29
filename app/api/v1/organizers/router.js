const express = require("express");
const router = express.Router();
const {
  createCMSOrganizer,
  createCMSUsers,
  getCMSUsers,
} = require("./controller");
const {
  authenticateUser,
  authorizeRoles,
} = require("./../../../middlewares/auth");

router.post(
  "/organizers",
  authenticateUser,
  authorizeRoles('owner'),
  createCMSOrganizer
);
router.post("/users", authenticateUser, authorizeRoles('organizer'), createCMSUsers);
router.get(
  "/users",
  authenticateUser,
  authorizeRoles("owner"),
  getCMSUsers
);

module.exports = router;
