import { personType } from "data/enums/personType";
import Person from "data/models/person";
import { autocompletePerson } from "data/types/autocompletePerson";
import searchStudent, {
  searchAutocompleteStudent,
} from "modules/suap/person/lib/searchStudent";
import studentsByDiary from "modules/suap/person/lib/studentsByDiary";
import searchDiaries from "./searchDiaries";

export default async function getDiaryById(diaryId: string, cookie: string) {
  try {
    const [diaryList, students] = await Promise.all([
      searchDiaries(diaryId, cookie),
      studentsByDiary(diaryId, cookie),
    ]);

    const diary = diaryList[0];
    diary.students = students;

    return diary;

    // const students = await searchAutocompleteStudent("", cookie, {
    //   diaryId: diaryId,
    // });

    // let list = students.items.map((item: autocompletePerson) =>
    //   Person.fromAutocomplete(item, personType.ALUNO)
    // );

    // // Inicia as demais páginas como vazio
    // let otherPages = [];

    // // Se precisa de paginação?
    // if (students.total > students.items.length) {
    //   // Última página da listagem
    //   const lastPage = Math.ceil(students.total / students.items.length);

    //   // Calcula quais as demais págnas que devem ser carregadas além da primeira
    //   // com um limite de 5 páginas para nao deixar os resultados gigantes e
    //   // prevenir qualquer erro
    //   const pages = [...new Array(lastPage)]
    //     .map((e, i) => i + 1)
    //     .filter((p) => p > 1 && p < 5);

    //   // Faz a busca pelas páginas seguintes em um promise e armazena os resultados
    //   otherPages = await Promise.all(
    //     pages.map((page) =>
    //       searchStudent("", cookie, { diaryId: diaryId }, page)
    //     )
    //   );
    // }

    // // Junta os alunos das buscas anteriores em uma lista
    // list = [...list, ...otherPages.flatMap((item) => item)];

    // Adiciona à instância do diário
    // diary.students = list;

    // return diary;
  } catch (error) {
    throw error;
  }
}
