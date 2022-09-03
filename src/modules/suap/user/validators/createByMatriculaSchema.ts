import Validator from "lib/validator";

const createByMatriculaSchema = Validator.schema((v: any) => ({
  matricula: v.string().required(),
}));

export default createByMatriculaSchema;
