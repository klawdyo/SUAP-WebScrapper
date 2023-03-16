import express from "express";
import authMiddleware from "../auth/auth.middleware";
import TravelController from "./travel.controller";

const router = express.Router();

router.get("/suap/travels", [authMiddleware], TravelController.search);
router.get("/suap/travels/:id", [authMiddleware], TravelController.first);

export default router;
