import User from "data/models/user";
import { tokenResponse } from "./tokenResponse";

// Tipo de dados retornados pelo login
export type loginResponse = {
  user: User;
  token: tokenResponse;
};
