import SUAP from "lib/suap";
import User from "data/models/user";
import authRepository from "modules/suap/auth/auth.repository";
import profileParser from "modules/suap/auth/lib/profileParser";
import searchPerson from "modules/suap/person/lib/searchPerson";
import userRepository from "../user.repository";

/**
 * Cadastra um usuário a partir da sua matrícula
 *
 *
 * @param matriculaToSave matrícula que será pesquisada no suap
 * @param loggedUser Usuário logado que será usado para se conectar ao SUAP e trazer os dados da matrícula pesquisada
 */
export default async function createByMatricula(
  matriculaToSave: number,
  loggedUser: User
) {
  try {
    // Verifica se o usuário já existe no banco. Se existir, retorna
    let userToSave = await userRepository.first(matriculaToSave);

    if (!userToSave) {
      // Pega as configurações do cookie do usuário logado
      const cookie = await authRepository.getCookie(loggedUser);

      if (cookie) {
        // Define o cookie e pega o conteúdo da página do usuário
        const profileContent = await SUAP
          // Inclui o cookie
          .setCookie(cookie)
          // Realiza a requisição GET
          .get(`/rh/servidor/${matriculaToSave}/`);

        // Processa o html recebido para mostrar somente as informações
        // necessárias
        const profile = profileParser(profileContent);

        // Pega a informação de id no suap
        const personData = await searchPerson(
          profile.matricula.toString(),
          cookie
        );

        if (personData.length) {
          profile.suapId = personData[0].suapId;
          profile.type = personData[0].type;
          profile.sector = personData[0].sector;
          profile.occupation = personData[0].occupation;
        }

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
    console.log("erro no create by atricula", error);

    throw error;
  }
}
