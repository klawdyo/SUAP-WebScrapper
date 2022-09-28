import { personType } from "../enums/personType";
import Campus from "./campus";
import User from "./user";

const data = (merge = {}) => ({
  id: 1,
  suapId: "123456",
  matricula: "1673621",
  cpf: "01234567890",
  email: "claudio@email.com",
  name: "Jose Claudio Medeiros de Lima",
  shortName: "Claudio Medeiros",
  image: "https://suap.ifrn.edu.br/media/fotos/75x100/2543.LafUPyr4RD2t.jpg",
  campus: "IP",
  type: personType.SERVIDOR,
  sector: "SEAC/IP",
  occupation: "Assistente em Administração",

  //
  ...merge,
});

describe("models/user", () => {
  //
  test("Should be successfully instanced", () => {
    const user = new User(data({}));
    // console.log(user);

    expect(user).toBeInstanceOf(User);
    expect(user.id).toBe(1);
    expect(user.suapId).toBe(123456);
    expect(user.matricula).toBe("1673621");
    expect(user.cpf).toBe("01234567890");
    expect(user.email).toBe("claudio@email.com");
    expect(user.name).toBe("Jose Claudio Medeiros de Lima");
    expect(user.shortName).toBe("Claudio Medeiros");
    expect(user.image).toBe(
      "https://suap.ifrn.edu.br/media/fotos/75x100/2543.LafUPyr4RD2t.jpg"
    );
    expect(user.campus).toBeInstanceOf(Campus);
    expect(user.campus?.short).toBe("IP");
    expect(user.sector).toBe("SEAC/IP");
    expect(user.occupation).toBe("Assistente em Administração");
  });

  //
  test("Should be successfully converted to json", () => {
    const user = new User(data());
    const json = user.toJSON();

    console.log(json);

    expect(json).toMatchObject({
      matricula: "1673621",
      cpf: "01234567890",
      email: "claudio@email.com",
      name: "Jose Claudio Medeiros de Lima",
      shortName: "Claudio Medeiros",
      image:
        "https://suap.ifrn.edu.br/media/fotos/75x100/2543.LafUPyr4RD2t.jpg",
      id: 1,
      suapId: 123456,
      campus: "IP",
      type: "government_employee",
      sector: "SEAC/IP",
      occupation: "Assistente em Administração",
    });
  });

  //
  test("Should be suapId as string", () => {
    const user = new User(data({ suapId: "40443" }));
    expect(user.suapId).toBe(40443);

    const user2 = new User(data({ suapId: null }));
    expect(user2.suapId).toBe(null);
  });

  //
  test("Should be empty instance", () => {
    const user = new User(null);

    console.log("user vazio", user);

    expect(user).toBeInstanceOf(User);
    expect(user.isEmpty()).toBeTruthy();
    expect(user.isNotEmpty()).toBeFalsy();
  });

  //
  test("Should be json with empty values", () => {
    const user = new User(null);
    const json = user.toJSON();

    console.log("user vazio", user);

    expect(json.cpf).toBe("");
    expect(json.email).toBe("");
    expect(json.name).toBe("");
    expect(json.shortName).toBe("");
    expect(json.image).toBe("");
    expect(json.type).toBe("");
    expect(json.sector).toBe("");
    expect(json.occupation).toBe("");
    expect(json.campus).toBeUndefined();
  });

  //
});
