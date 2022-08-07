import express from "express";
import authMiddleware from "../auth/auth.middleware";
import TravelController from "./travel.controller";

const router = express.Router();

router.get("/suap/travels", [authMiddleware], TravelController.search);

export default router;
