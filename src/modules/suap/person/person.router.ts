import express from "express";
import authMiddleware from "../auth/auth.middleware";
import PesrsonController from "./person.controller";

const router = express.Router();

router.get(
  "/suap/users/search_people",
  [authMiddleware],
  PesrsonController.searchPeople
);

router.get(
  "/suap/users/search_students",
  [authMiddleware],
  PesrsonController.searchStudents
);

router.get(
  "/suap/users/search_employees",
  [authMiddleware],
  PesrsonController.searchEmployees
);

export default router;
