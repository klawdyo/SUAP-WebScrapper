import Validator from "lib/validator";

const createSchema = Validator.schema((v: any) => ({
  matricula: v.string().required(),
  email: v.string().email().required(),
  name: v.string().required(),
  image: v.string().required(),
  cpf: v.string().required(),
}));

export default createSchema;
