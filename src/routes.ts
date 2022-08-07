// import itemRouter from "./modules/item/item.router";
import suapAuthRouter from "modules/suap/auth/auth.router";
import suapUserRouter from "modules/suap/user/user.router";

//
import errorRouter from "modules/suap/error/error.router";

export default [
  //
  // itemRouter,
  suapAuthRouter,
  suapUserRouter,

  // Rota de erro
  errorRouter,
];
