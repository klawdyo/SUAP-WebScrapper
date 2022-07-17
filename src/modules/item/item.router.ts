import express from "express";
import Item from "../../models/item";
import ItemController from "./item.controller";
import itensRepository from "./item.repository";

const itensRouter = express.Router();

itensRouter.post("/itens", ItemController.add);

itensRouter.get("/itens", ItemController.list);

itensRouter.get("/itens/:id", ItemController.show);

itensRouter.put("/itens/:id", ItemController.update);

itensRouter.delete("/itens/:id", ItemController.delete);

export default itensRouter;
