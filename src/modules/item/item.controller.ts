import Item from "../../models/item";
import itensRepository from "./item.repository";

export default class ItemController {
  //
  static async list(req: any, res: any) {
    itensRepository.lerTodos((itens) => res.json(itens));
  }

  //
  static async show(req: any, res: any) {
    const id: number = +req.params.id;
    itensRepository.ler(id, (item) => {
      if (item) {
        res.json(item);
      } else {
        res.status(404).send();
      }
    });
  }

  //
  static async add(req: any, res: any) {
    const item: Item = req.body;
    itensRepository.criar(item, (id) => {
      if (id) {
        res.status(201).location(`/itens/${id}`).send();
      } else {
        res.status(400).send();
      }
    });
  }

  //
  static async update(req: any, res: any) {
    const id: number = +req.params.id;
    itensRepository.atualizar(id, req.body, (notFound) => {
      if (notFound) {
        res.status(404).send();
      } else {
        res.status(204).send();
      }
    });
  }

  //
  static async delete(req: any, res: any) {
    const id: number = +req.params.id;
    itensRepository.apagar(id, (notFound) => {
      if (notFound) {
        res.status(404).send();
      } else {
        res.status(204).send();
      }
    });
  }
}
