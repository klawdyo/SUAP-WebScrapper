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
      const user = await userRepository.first(1673621);

      return response.status(200).json(user);
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

      const user = await userRepository.save(payload);
      return Output.success(user);
    } catch (error: Error | any) {
      return Output.exception(error);
    }
  }

  /**
   *
   * @param req
   * @param res
   */
  static async delete(request: Request, response: Response) {
    try {
      const id = +request.params.id;

      const user = await userRepository.delete(id);
      return Output.success(user);
    } catch (error: Error | any) {
      return Output.exception(error);
    }
  }
}
