import SUAP from "lib/suap";
import User from "data/models/user";
import authRepository from "modules/suap/auth/auth.repository";
import employeeProfileParser from "modules/suap/user/lib/employeeProfileParser";
import searchPerson from "modules/suap/person/lib/searchPerson";
import userRepository from "../user.repository";
import { personType } from "data/enums/personType";
import Person from "data/models/person";
import getProfileByMatricula from "./getProfileByMatricula";

/**
 * Cadastra um usuário a partir da sua matrícula
 *
 *
 * @param matricula matrícula que será pesquisada no suap
 * @param loggedUser Usuário logado que será usado para se conectar ao SUAP e trazer os dados da matrícula pesquisada
 */
export default async function createByMatricula(
  matricula: string,
  loggedUser: User
) {
  try {
    // Verifica se o usuário já existe no banco. Se existir, retorna
    let userToSave = await userRepository.first(matricula);

    if (!userToSave) {
      // Pega as configurações do cookie do usuário logado
      const cookie = await authRepository.getCookie(loggedUser);

      if (cookie) {
        // Pesquisa os dados do perfil referent à matrícula independente de ser
        // servidor ou aluno
        const profile = await getProfileByMatricula(matricula, cookie);

        // Salva o usuário pesquisado no banco
        userToSave = await userRepository.save(profile);
      } else
        throw {
          code: 403,
          message: "Usuário não autenticado",
        };
    }

    return userToSave;
  } catch (error) {
    console.log("Catch createByMatricula: ", error);

    throw error;
  }
}
