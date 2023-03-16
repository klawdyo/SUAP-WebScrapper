import SUAP from "lib/suap";
import User from "data/models/user";
import authRepository from "modules/suap/auth/auth.repository";
import employeeProfileParser from "modules/suap/user/lib/employeeProfileParser";
import searchPerson from "modules/suap/person/lib/searchPerson";
import userRepository from "../user.repository";
import { personType } from "data/enums/personType";
import Person from "data/models/person";
import studentProfileParser from "./studentProfileParser";

/**
 * Pega os dados de um usuário a partir de sua matrícula e devolve
 * as informações mescladas entre a página de perfil e as informações
 * básicas dos autocomplete.
 * Se for aluno, mostre as informações do aluno. Se for servidor, mostre as informações dele
 *
 * @param matricula matrícula que será pesquisada no suap
 * @param cookie
 */
export default async function getProfileByMatricula(
  matricula: string,
  cookie: string
): Promise<User> {
  try {
    // Pega a informação do autocomplete do SUAP
    const personData = await searchPerson(matricula.toString(), cookie);

    // Se não encontrar alguém na busca, encerre
    if (!personData.length)
      throw { code: 404, message: "Matrícula não encontrada" };

    // Pega a primeira pessoa da busca
    const person = personData[0];

    // Cria um usuário a partir de uma pessoa
    const profile = new User(person.toJSON());

    // console.log("usuário a partir de uma pessoa", profile);

    if (person.type === personType.SERVIDOR) {
      const employee = await getEmployeeProfile(person, cookie);

      console.log("SERVIDOR: ", employee);
      return employee;
    } else if (person.type === personType.ALUNO) {
      const student = await getStudentProfile(person, cookie);
      console.log("ALUNO: ", student);
      return student;
    } else {
      throw {
        code: 404,
        message:
          "Matrícula não localizada. Verifique se é um servidor ou aluno ativo",
      };
    }
  } catch (error) {
    console.log("erro no create by atricula", error);

    throw error;
  }
}

/**
 * Pesquisa o perfil do usuário a partir da matrícula
 *
 * @param person
 */
async function getEmployeeProfile(
  person: Person,
  cookie: string
): Promise<User> {
  try {
    const suap = new SUAP();
    // Define o cookie e pega o conteúdo da página do usuário
    const profileContent = await suap
      // Inclui o cookie
      .setCookie(cookie)
      // Realiza a requisição GET
      .get(`/rh/servidor/${person.matricula}/`);

    // Processa o html recebido para mostrar somente as informações
    // necessárias
    const profile = employeeProfileParser(profileContent);

    //
    profile.suapId = person.suapId;
    profile.type = person.type;
    profile.sector = person.sector;
    profile.occupation = person.occupation;

    return profile;
  } catch (error) {
    throw error;
  }
}

/**
 * Pesquisa o perfil do aluno a partir da matrícula
 *
 * @param person
 */
async function getStudentProfile(
  person: Person,
  cookie: string
): Promise<User> {
  try {
    const suap = new SUAP();
    // Define o cookie e pega o conteúdo da página do usuário
    const profileContent = await suap
      // Inclui o cookie
      .setCookie(cookie)
      // Realiza a requisição GET
      .get(`/edu/aluno/${person.matricula}/`);

    // Processa o html recebido para mostrar somente as informações
    // necessárias
    const profile = studentProfileParser(profileContent);

    //
    profile.suapId = person.suapId;
    profile.type = person.type;
    profile.sector = person.sector;
    profile.occupation = person.occupation;

    return profile;
  } catch (error) {
    throw error;
  }
}
