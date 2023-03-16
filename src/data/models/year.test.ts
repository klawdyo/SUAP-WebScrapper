import Year from "./year";

const data = (merge = {}) => ({
  id: 70,
  year: 2022,
});

describe("models/year", () => {
  test("Should be successfully instanced", () => {
    const year = new Year(70, 2022);

    expect(year).toBeInstanceOf(Year);
    expect(year.id).toBe(70);
    expect(year.year).toBe(2022);
  });

  test("Should return a list of Year objects", () => {
    const list = Year.list();

    expect(list).toBeInstanceOf(Array);
    expect(list[0]).toBeInstanceOf(Year);
    expect(list[1]).toBeInstanceOf(Year);
  });

  test("Should retorna a Year instance by year", () => {
    const year = Year.get(2022);

    expect(year).toBeInstanceOf(Year);
    expect(year?.id).toBe(70);
    expect(year?.year).toBe(2022);
  });

  test("Should retorna undefined by search a not found year", () => {
    const year = Year.get(1977);

    expect(year).toBeUndefined();
  });

  //
});
