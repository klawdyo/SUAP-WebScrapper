import Campus from "./campus";

const data = (merge = {}) => ({
  id: 6,
  short: "IP",
  name: "Ipanguaçu",

  //
  ...merge,
});

describe("models/campus", () => {
  test("Should be successfully instanced", () => {
    const campus = new Campus(data());

    expect(campus).toBeInstanceOf(Campus);
    expect(campus?.id).toBe(6);
    expect(campus?.short).toBe("IP");
    expect(campus?.name).toBe("Ipanguaçu");
  });

  //
  test("Should be list of campi", () => {
    const list = Campus.list();

    expect(list.length).toBeGreaterThan(20);
    expect(list[0]).toBeInstanceOf(Campus);
    expect(list[1]).toBeInstanceOf(Campus);
  });

  //
  test("Should be get a campus", () => {
    const ip = Campus.get("IP");

    expect(ip).toBeInstanceOf(Campus);
    expect(ip?.id).toBe(6);
    expect(ip?.short).toBe("IP");
    expect(ip?.name).toBe("Ipanguaçu");
  });

  //
});
