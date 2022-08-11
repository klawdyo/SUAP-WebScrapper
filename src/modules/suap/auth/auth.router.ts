import express from "express";
import AuthController from "./auth.controller";
import authMiddleware from "./auth.middleware";
import loginValidator from "./validators/login.validator";

const router = express.Router();

router.post("/suap/auth/login", [loginValidator], AuthController.login);
router.post("/suap/auth/logged", AuthController.logged);
router.get("/suap/auth/profile", [authMiddleware], AuthController.profile);
router.post("/suap/auth/logout", [authMiddleware], AuthController.logout);

export default router;
