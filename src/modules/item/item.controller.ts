import { Request, Response } from "express";

import Item from "../../models/item";
import itensRepository from "./item.repository";

export default class ItemController {
  //
  static async list(request: Request, response: Response) {
    itensRepository.lerTodos((itens) => response.json(itens));
  }

  //
  static async show(request: Request, response: Response) {
    const id: number = +request.params.id;
    itensRepository.ler(id, (item) => {
      if (item) {
        response.json(item);
      } else {
        response.status(404).send();
      }
    });
  }

  //
  static async add(request: Request, response: Response) {
    const item: Item = request.body;
    itensRepository.criar(item, (id) => {
      if (id) {
        response.status(201).location(`/itens/${id}`).send();
      } else {
        response.status(400).send();
      }
    });
  }

  //
  static async update(request: Request, response: Response) {
    const id: number = +request.params.id;
    itensRepository.atualizar(id, request.body, (notFound) => {
      if (notFound) {
        response.status(404).send();
      } else {
        response.status(204).send();
      }
    });
  }

  //
  static async delete(request: Request, response: Response) {
    const id: number = +request.params.id;
    itensRepository.apagar(id, (notFound) => {
      if (notFound) {
        response.status(404).send();
      } else {
        response.status(204).send();
      }
    });
  }
}
