import jwt from "jsonwebtoken";

import SUAP from "lib/suap";
import Campus from "data/models/campus";
import User from "data/models/user";
import searchPerson from "modules/suap/person/lib/searchPerson";
import userRepository from "modules/suap/user/user.repository";
import authRepository from "../auth.repository";
import employeeProfileParser from "../../user/lib/employeeProfileParser";
import { loginResponse } from "data/types/authResponse";
import Constants from "data/constants/constants";

/**
 * Efetua o login no SUAP, verifica se o usuário está apto a efetuar login e
 * retorna os dados do usuário e o token de autenticação, caso esteja.
 *
 * @param matricula
 * @param password
 * @returns
 */
export default async function login(
  matricula: string,
  password: string
): Promise<loginResponse> {
  try {
    // Efetua o login no suap e pega o cookie
    const cookie = await SUAP.getCookie(matricula, password);

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
      const profile = employeeProfileParser(profileContent);

      // Pega a informação de id no suap
      const personData = await searchPerson(profile.matricula, cookie);

      // Se encontrou os dados
      if (personData.length) {
        profile.suapId = personData[0].suapId;
        profile.type = personData[0].type;
        profile.sector = personData[0].sector;
        profile.occupation = personData[0].occupation;
      }

      //
      user = await userRepository.save(profile);
    }

    // Se o usuário logado não tiver permissão para fazê-lo, encerre
    // a tentativa de login.
    if (!isAuthAllowed(user))
      throw {
        code: 401,
        message: "Autenticação registra a servidores do campus Ipanguaçu",
      };

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

/**
 * Define as restrições para login
 * - Se o app é aceito somente por um determinado campus ou se é
 * somente para servidores etc.
 */
function isAuthAllowed(user: User): Boolean {
  // Se é somente para servidor
  if (
    Constants.IS_ALLOWED_ONLY_GOVERNMENT_EMPLOYEES &&
    user.matricula.toString().length > 7
  )
    return false;

  // Se não pertence aos campi permitidos
  if (!Constants.ALLOWED_CAMPI.includes(user.campus?.short!)) return false;

  return true;
}
