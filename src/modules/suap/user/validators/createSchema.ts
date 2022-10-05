import Validator from "lib/validator";
import { validateOrFail } from "validation-br/dist/cpf";

const isCPF = (value: string | number, helper: any) => {
  try {
    validateOrFail(value);
  } catch (error: any) {
    return helper.message(error.message);
  }
};

const createSchema = Validator.schema((v: any) => ({
  matricula: v.string().required(),
  email: v.string().email().required(),
  name: v.string().required(),
  image: v.string().required(),
  cpf: v.string().required().custom(isCPF),
}));

export default createSchema;
