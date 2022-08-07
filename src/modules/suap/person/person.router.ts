import express from "express";
import authMiddleware from "../auth/auth.middleware";
import PesrsonController from "./person.controller";

const router = express.Router();

router.get(
  "/suap/people/search",
  [authMiddleware],
  PesrsonController.searchPeople
);

router.get(
  "/suap/people/search_students",
  [authMiddleware],
  PesrsonController.searchStudents
);

router.get(
  "/suap/people/search_employees",
  [authMiddleware],
  PesrsonController.searchEmployees
);

export default router;
