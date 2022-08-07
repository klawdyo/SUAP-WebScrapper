import express from "express";
import authMiddleware from "../auth/auth.middleware";
import DiaryController from "./diary.controller";

const router = express.Router();

router.get("/suap/diaries", [authMiddleware], DiaryController.search);

export default router;
