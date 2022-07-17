import express from "express";
import ItemController from "./item.controller";

const router = express.Router();

router.post("/itens", ItemController.add);
router.get("/itens", ItemController.list);
router.get("/itens/:id", ItemController.show);
router.put("/itens/:id", ItemController.update);
router.delete("/itens/:id", ItemController.delete);

export default router;
