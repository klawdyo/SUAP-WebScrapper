import express from "express";
// import Item from "../../../models/item";
import AuthController from "./auth.controller";
import authMiddleware from "./auth.middleware";
// import itensRepository from "./item.repository";

const router = express.Router();

router.post("/suap/auth/login", AuthController.login);
router.post("/suap/auth/logged", AuthController.logged);
// Recebe um JWT e verifica se ele está válido
// router.post("/suap/auth/verify", AuthController.verify);
router.get("/suap/auth/profile", [authMiddleware], AuthController.profile);

export default router;
