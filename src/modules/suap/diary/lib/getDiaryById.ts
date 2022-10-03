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
  } catch (error) {
    throw error;
  }
}
