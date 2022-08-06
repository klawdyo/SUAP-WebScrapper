// import Joi from "joi";
// import Validator from "./index";
// import { ValidatorSchema } from "./types";

// export default class LoginValidator extends Validator {
//   schema: ValidatorSchema = Joi.object({
//     matricula: Joi.number().required(),
//     password: Joi.string().required(),
//   });
// }

// describe("Validator", () => {
//   //
//   test("Valida formulário de Login", async () => {
//     const data = {
//       matricula: "1673621",
//       password: "teteteu",
//     };

//     const validation = new LoginValidator(data);

//     const valid = await validation.isValid();
//     console.log("Teste Válido", valid);

//     expect(valid).toBe(true);
//   });

//   //
//   test("Tenta validar formulário com dados errados", async () => {
//     const data = {
//       matricula: "abc",
//       password: "2022",
//     };

//     const validation = new LoginValidator(data);

//     const valid = await validation.isValid();
//     expect(valid).toBe(false);
//   });
//   //
//   test("Valida formulário de Login", async () => {
//     const data = {
//       matricula: "1673621",
//       password: "teteteu",
//     };

//     const validation = new LoginValidator(data);

//     const valid = await validation.validate();
//     console.log("Teste Válido", valid);

//     expect(valid).toMatchObject({ matricula: 1673621, password: "teteteu" });
//   });

//   //
//   test("Tenta validar formulário com dados errados", async () => {
//     const data = {
//       matricula: "1234567",
//       password: "2022",
//     };

//     const validation = new LoginValidator(data);

//     // const valid = validation.validate();
//     expect(async () => {
//       await validation.validate();
//     }).toThrowError();
//   });
// });
