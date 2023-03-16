import Student from "./student";

const data = (merge = {}) => ({
  name: "Paladino Mascarado",
  matricula: "202210514000012",
  birth: new Date("1982-07-31"),
  age: 40,

  //
  ...merge,
});

describe("models/student", () => {
  //
  test("Should be successfully instanced", () => {
    const student = new Student(data());

    expect(student).toBeDefined();
    expect(student.name).toBe("Paladino Mascarado");
    expect(student.matricula).toBe("202210514000012");
    expect(student.birth).toBeInstanceOf(Date);
    expect(student.age).toBe(40);
  });

  //
  test("Should be successfully instanced - without age", () => {
    const student = new Student(data({ age: null }));

    expect(student).toBeDefined();
    expect(student.name).toBe("Paladino Mascarado");
    expect(student.matricula).toBe("202210514000012");
    expect(student.birth).toBeInstanceOf(Date);
    expect(student.age).toBe(40);
  });

  //
  test("Should be successfully converted to JSON", () => {
    const student = new Student(data());
    const json = student.toJSON();

    expect(json).toBeDefined();
    expect(json.name).toBe("Paladino Mascarado");
    expect(json.matricula).toBe("202210514000012");
    expect(json.birth).toBeInstanceOf(Date);
    expect(json.age).toBe(40);
  });

  //
  test("Should be successfully converted to JSON from empty data", () => {
    const student = new Student({});
    const json = student.toJSON();

    expect(json).toBeDefined();
    expect(json.name).toBe(null);
    expect(json.matricula).toBe(null);
    // expect(json.birth).toBeInstanceOf(Date);
    expect(json.age).toBe(null);
  });
});
