import { Request, Response } from "express";
import DB from "../../../lib/database";
import Output from "../../../lib/output";
import User from "../../../models/user";
import userRepository from "./user.repository";
// import OutputResponse from "../../../lib/output_response";

export default class UserController {
  /**
   *
   * @param req
   * @param res
   */
  static async profile(request: Request, response: Response) {
    try {
      // const user = new User({
      //   id: 1673621,
      //   name: "Cláudio Medeiros",
      //   image: "foto.jpeg",
      // });

      // userRepository.save(user);

      const user = await userRepository.first(1673621);

      console.log(user);

      return response.status(200).json({ ok: true });
    } catch (error) {}
  }

  /**
   *
   * @param req
   * @param res
   */
  static async all(request: Request, response: Response) {
    try {
      const user = await userRepository.all();

      console.log(user);

      // return response.status(200).json(user);
      return Output.success(user);
    } catch (error) {}
  }

  /**
   *
   * @param req
   * @param res
   */
  static async create(request: Request, response: Response) {
    try {
      const payload = new User(request.body);

      // const user = await userRepository.all();

      const user = await userRepository.save(payload);

      console.log("payload: ", payload);
      console.log("user: ", user);

      // return response.status(200).json(user);
      return Output.success(user);
    } catch (error: Error | any) {
      // console.log(error);
      let message = "Erro desconhecido";

      switch (error["code"]) {
        case "SQLITE_CONSTRAINT":
          message = "Matrícula já cadastrada";
      }

      // return response.status(400).json({ error: true, message });
      // return Output.unauthorized(null, message);
      return Output.badRequest(null, message);
      // return Output.error(400, null, message);
    }
  }
}
