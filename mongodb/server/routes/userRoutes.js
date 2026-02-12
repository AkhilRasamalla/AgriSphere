const express = require("express");
const { check } = require("express-validator");
const userController = require("../controllers/userController");

const router = express.Router();

/* ======================
   SIGNUP
====================== */
router.post(
  "/signup",
  [
    check("email").isEmail(),
    check("password").isLength({ min: 6 }),
    check("username").not().isEmpty(),
  ],
  userController.signup
);

/* ======================
   LOGIN (ONLY ONE)
====================== */
router.post("/login", userController.login);

/* ======================
   USER ROUTES
====================== */
router.get("/:id", userController.getUserData);
router.put("/:id/preferences", userController.updateUserData);
router.put("/:id/change-password", userController.changePassword);

module.exports = router;
