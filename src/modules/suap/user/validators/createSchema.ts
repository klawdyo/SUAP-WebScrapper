import Validator from "lib/validator";
import { isCPF } from "lib/validator/extend";

const createSchema = Validator.schema((v: any) => ({
  matricula: v.string().required(),
  email: v.string().email().required(),
  name: v.string().required(),
  image: v.string().required(),
  cpf: v.string().required().custom(isCPF),
}));

export default createSchema;
