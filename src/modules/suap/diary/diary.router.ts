import express from "express";
import authMiddleware from "../auth/auth.middleware";
import DiaryController from "./diary.controller";

const router = express.Router();

router.get("/suap/diaries", [authMiddleware], DiaryController.search);

//
router.get(
  "/suap/diaries/:diaryId",
  [authMiddleware],
  DiaryController.searchById
);

export default router;
