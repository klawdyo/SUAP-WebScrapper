import express from "express";
import authMiddleware from "../auth/auth.middleware";
import PesrsonController from "./person.controller";

const router = express.Router();

router.get("/suap/people", [authMiddleware], PesrsonController.searchPeople);

router.get(
  "/suap/people/student",
  [authMiddleware],
  PesrsonController.searchStudent
);

export default router;
