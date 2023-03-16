import { validateOrFail } from "validation-br/dist/cpf";

export const isCPF = (value: string | number, helper: any) => {
  try {
    validateOrFail(value);
    return value;
  } catch (error: any) {
    return helper.message(error.message);
  }
};
