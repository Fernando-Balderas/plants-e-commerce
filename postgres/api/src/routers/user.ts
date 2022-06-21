import express from "express";
// import passport from 'passport'

import userController from "../controllers/user";

const router = express.Router();

// Every path we define here will get /api/v1/users prefix
router.get("/", userController.findAll);
router.get("/:userId", userController.findById);
router.put("/:userId", userController.update);
// router.put("/:userId/profile", userController.updateProfile);
// router.put("/:userId/password", userController.updatePassword);
// router.put("/:userId/status", userController.updateStatus);
// router.put("/password-reset", userController.resetPassword);
router.delete("/:userId", userController._delete);
// router.post(
//   "/google-login",
//   // passport.authenticate('google-id-token', { session: false }),
//   userController.googleLogin
// );
// router.post("/login", userController.findByEmailAndPassword);
router.post("/signup", userController.create);
// router.post("/validate-token", userController.validateToken);

export default router;
