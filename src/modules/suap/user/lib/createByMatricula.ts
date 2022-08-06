import SUAP from "lib/suap";
import User from "models/user";
import authRepository from "modules/suap/auth/auth.repository";
import profileParser from "modules/suap/auth/lib/profileParser";
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

      // Define o cookie e pega o conteúdo da página do usuário
      const profileContent = await SUAP
        // Inclui o cookie
        .setCookie(cookie)
        // Realiza a requisição GET
        .get(`/rh/servidor/${matriculaToSave}/`);

      // Processa o html recebido para mostrar somente as informações
      // necessárias
      const profile = profileParser(profileContent);

      // Salva o usuário pesquisado no banco
      userToSave = await userRepository.save(profile);
    }

    return userToSave;
  } catch (error) {
    console.log("erro no create by atricula", error);

    throw error;
  }
}
