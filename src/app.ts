// Observações:
// - Não configura a porta para que nos testes o servidor não suba na mesma porta
// - Os testes irão rodar sem ocupar uma porta, executando os métodos diretamente.

import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

import express from "express";
import cors from "cors";
import helmet from "helmet";

import router from "./routes";
import Output from "./lib/output";

class AppController {
  express;

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
    this.express.use(Output.middleware);
  }

  routes() {
    this.express.use(router);
    // Rotas não existentes
    this.express.use((req, res) => res.status(404));
  }
}

export default new AppController().express;
