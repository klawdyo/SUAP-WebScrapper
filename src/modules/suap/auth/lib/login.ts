import jwt from "jsonwebtoken";

import SUAP from "lib/suap";
import User from "models/user";
import searchPerson from "modules/suap/person/lib/searchPerson";
import userRepository from "modules/suap/user/user.repository";
import authRepository from "../auth.repository";
import profileParser from "./profileParser";

type tokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

type loginResponse = {
  user: User;
  token: tokenResponse;
};

export default async function login(
  matricula: number,
  password: string
): Promise<loginResponse> {
  try {
    // Pega o cookie após login
    const cookie = await SUAP.getCookie(matricula.toString(), password);

    // Pesquisa se o usuário já está cadastrado no banco de dados
    let user = await userRepository.first(matricula);

    // Verifica se o usuário já está no banco de dados
    if (!user) {
      // Define o cookie e pega o conteúdo da página do usuário
      const profileContent = await SUAP
        // Inclui o cookie
        .setCookie(cookie)
        // Realiza a requisição GET
        .get(`/rh/servidor/${matricula}/`);

      //
      const profile = profileParser(profileContent);

      // Pega a informação de id no suap
      const personData = await searchPerson(
        profile.matricula.toString(),
        cookie
      );

      if (personData.length) {
        console.log("personData", personData[0]);
        profile.suapId = personData[0].suapId;
      }

      //
      user = await userRepository.save(profile);
    }

    // Crio/Atualizo o token salvo no banco
    await authRepository.save(cookie, user);

    // Gero o Token JWT
    const token = jwt.sign({ matricula }, process.env.APP_KEY || "", {
      expiresIn: authRepository._tokenTimeout,
    });

    return {
      user,
      token: {
        access_token: token,
        token_type: "Bearer",
        expires_in: authRepository._tokenTimeout,
      },
    };
  } catch (error) {
    throw error;
  }
}
