import homeRouter from "modules/home/home.router";

// SUAP
import suapAuthRouter from "modules/suap/auth/auth.router";
import suapUserRouter from "modules/suap/user/user.router";
import suapPersonRouter from "modules/suap/person/person.router";
import suapDiaryRouter from "modules/suap/diary/diary.router";
import suapTravelRouter from "modules/suap/travel/travel.router";

//
import errorRouter from "modules/error/error.router";

export default [
  homeRouter,

  // SUAP
  suapAuthRouter,
  suapUserRouter,
  suapPersonRouter,
  suapDiaryRouter,
  suapTravelRouter,

  // Rota de erro
  errorRouter,
];
