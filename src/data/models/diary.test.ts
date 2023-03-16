import Diary from "./diary";
import Student from "./student";

const data = (merge = {}) => ({
  suapId: 123456,
  code: "TIN.1234",
  name: "Artes III",
  workload: 80,
  classes: 120,
  level: "Médio",
  students: [],
});

describe("models/diary", () => {
  //
  test("Should be successfully instanced", () => {
    const diary = new Diary(data());

    expect(diary).toBeInstanceOf(Diary);
    expect(diary.suapId).toBe(123456);
    expect(diary.code).toBe("TIN.1234");
    expect(diary.name).toBe("Artes III");
    expect(diary.workload).toBe(80);
    expect(diary.classes).toBe(120);
    expect(diary.level).toBe("Médio");
    expect(diary.students).toMatchObject([]);
  });

  //
  test("Should be successfully instanced from empty data", () => {
    const diary = new Diary({});
    // console.log(diary);

    expect(diary).toBeInstanceOf(Diary);
    expect(diary.suapId).toBeUndefined();
    expect(diary.code).toBeUndefined();
    expect(diary.name).toBeUndefined();
    expect(diary.workload).toBeUndefined();
    expect(diary.classes).toBeUndefined();
    expect(diary.level).toBeUndefined();
    expect(diary.students).toBeUndefined();
  });

  //
  // Dados recebidos a partir do autocomplete
  //
  //
  test("Should be successfully instanced from autocomplete", () => {
    const diary = Diary.fromAutocomplete({
      id: 11400,
      html: "11400 - TIN.0486 - Energias Renováveis(45H)  - Médio [45 h/60 Aulas]",
      text: "11400 - TIN.0486 - Energias Renováveis(45H)  - Médio [45 h/60 Aulas]",
    });

    expect(diary).toBeInstanceOf(Diary);
    expect(diary?.suapId).toBe(11400);
  });

  //
  // Dados recebidos a partir do autocomplete
  //
  //
  test("Should be successfully instanced from unpattern autocomplete", () => {
    const diary = Diary.fromAutocomplete({
      id: 11400,
      html: "11400 - TIN.0486 - Energias Renováveis(45H)  - Médio [45 h/60 Aulas]",
      text: "11400s Renováveis(45H)  - Médio [45 h/60 Aulas]",
    });

    expect(diary).toBeNull();
    // expect(diary?.suapId).toBe(11400);
  });

  //
});
