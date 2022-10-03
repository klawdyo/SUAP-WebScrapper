// Observações:
// - Não configura a porta para que nos testes o servidor não suba na mesma porta
// - Os testes irão rodar sem ocupar uma porta, executando os métodos diretamente.

import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";

import router from "./routes";
import Output from "lib/output";
import User from "data/models/user";

// Inclui uma propriedade que será usada para incluir o
// usuário logado na interface do request
declare global {
  namespace Express {
    interface Request {
      user: User | null;
    }
  }
}

class AppController {
  express: Express;

  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(cors());
    this.express.use(helmet());

    // Inclui na interface de Response os métodos usados para
    // retorno http, como not found, forbidden etc.
    this.express.use(Output.middleware);
  }

  routes() {
    this.express.use(router);
    // Rotas não existentes
    this.express.use((req, res) => res.status(404));
  }
}

const app = new AppController();

module.exports = app.express; // <- Precisa "module.exports" e não "export default"
//                            //    para que o supertest consiga usar.
