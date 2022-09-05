import express from "express";
import authMiddleware from "../auth/auth.middleware";
import PesrsonController from "./person.controller";

const router = express.Router();

// busca pessoas por nome ou matricula
router.get("/suap/people", [authMiddleware], PesrsonController.searchPeople);

// busca Alunos por nome ou matricula
router.get(
  "/suap/people/student",
  [authMiddleware],
  PesrsonController.searchStudent
);

// ALunos por diário
router.get(
  "/suap/people/student_by_diary/:diaryId",
  [authMiddleware],
  PesrsonController.byDiary
);

export default router;
