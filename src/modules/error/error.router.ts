import express, { Request, Response } from "express";

const router = express.Router();

router.all("*", (request: Request, response: Response) => response.notFound());

export default router;
