import express from "express";
import authMiddleware from "../auth/auth.middleware";
import UserController from "./user.controller";
import createByMatriculaSchema from "./validators/createByMatriculaSchema";
import createSchema from "./validators/createSchema";

const router = express.Router();

// Lista
router.get(
  "/suap/users",
  [authMiddleware], //
  UserController.all
);

// Cria com dados
router.post(
  "/suap/users",
  [authMiddleware, createSchema],
  UserController.create
);

// Cria com matrícula
router.post(
  "/suap/users/by_matricula",
  [authMiddleware, createByMatriculaSchema],
  UserController.createByMatricula
);

//
router.delete("/suap/users/:userId", [authMiddleware], UserController.delete);

export default router;
