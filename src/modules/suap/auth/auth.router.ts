import express from "express";
// import Item from "../../../models/item";
import AuthController from "./auth.controller";
// import itensRepository from "./item.repository";

const router = express.Router();

router.get("/suap/auth/login", AuthController.login);

export default router;
