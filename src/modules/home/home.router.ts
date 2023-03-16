import express from "express";
import HomeController from "./home.controller";

const router = express.Router();

router.get("/", HomeController.start);

export default router;
