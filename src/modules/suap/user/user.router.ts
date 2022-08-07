import express from "express";
import authMiddleware from "../auth/auth.middleware";
import UserController from "./user.controller";

const router = express.Router();

router.get("/suap/users", [authMiddleware], UserController.all);
router.post("/suap/users", [authMiddleware], UserController.create);
router.post(
  "/suap/users/by_matricula",
  [authMiddleware],
  UserController.createByMatricula
);
router.delete("/suap/users/:userId", [authMiddleware], UserController.delete);

export default router;
