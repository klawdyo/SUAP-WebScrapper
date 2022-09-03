import Validator from "lib/validator";

const loginSchema = Validator.schema((v: any) => ({
  matricula: v.number().required(),
  password: v.string().min(8).required().label("Senha"),
}));

export default loginSchema;
