import Validator from "lib/validator";

const createByMatriculaSchema = Validator.schema((v: any) => ({
  matricula: v // <- objeto Joi
    .string()
    .required()
    .regex(/^\d+$/)
    .messages({
      "string.base": "Matrícula precisa ser uma string",
      "string.pattern.base": "Matrícula precisa ser numérico",
      "string.empty": "Campo obrigatório",
    }),
}));

export default createByMatriculaSchema;
