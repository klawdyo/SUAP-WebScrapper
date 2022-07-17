import { Request, Response } from "express";
export default class AuthController {
  /**
   *
   * @param req
   * @param res
   */
  static async login(request: Request, response: Response) {
    return response.json({
      olar: true,
    });
  }
}
