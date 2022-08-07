// import itemRouter from "./modules/item/item.router";
import suapAuthRouter from "modules/suap/auth/auth.router";
import suapUserRouter from "modules/suap/user/user.router";
import suapPersonRouter from "modules/suap/person/person.router";
import suapDiaryRouter from "modules/suap/diary/diary.router";
import suapTravelRouter from "modules/suap/travel/travel.router";

//
import errorRouter from "modules/suap/error/error.router";

export default [
  //
  // itemRouter,
  suapAuthRouter,
  suapUserRouter,
  suapPersonRouter,
  suapDiaryRouter,
  suapTravelRouter,

  // Rota de erro
  errorRouter,
];
