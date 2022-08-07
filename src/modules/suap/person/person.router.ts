import express from "express";
import authMiddleware from "../auth/auth.middleware";
import PesrsonController from "./person.controller";

const router = express.Router();

router.get(
  "/suap/people/search",
  [authMiddleware],
  PesrsonController.searchPeople
);

export default router;
