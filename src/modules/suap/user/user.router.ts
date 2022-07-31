import express from "express";
import UserController from "./user.controller";

const router = express.Router();

router.get("/suap/user/profile", UserController.profile);
router.get("/suap/users", UserController.all);
router.post("/suap/users", UserController.create);

export default router;
