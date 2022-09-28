import Travel from "./travel";

describe("models/travel", () => {
  //
  test("Should be sucessfully instanced - not authorized", () => {
    const travel = new Travel({
      suapId: "123456",
      requester: "José Claudio",
      leavesAt: "28/09/2022 08:00:00",
      arrivesAt: "28/09/2022 17:00:00",
      objective: "Objetivo teste",
      isAuthorized: "Não Autorizado",
      isDeferred: "Não Autorizado",
    });

    expect(travel).toBeInstanceOf(Travel);
    expect(travel.isAuthorized).toBe(false);
    expect(travel.isDeferred).toBe(false);
    expect(travel.suapId).toBe(123456);
    expect(travel.leavesAt).toBe("2022-09-28T08:00:00.000-03:00");
    expect(travel.arrivesAt).toBe("2022-09-28T17:00:00.000-03:00");
  });

  //
  test("Should be sucessfully instanced - indeferred", () => {
    const travel = new Travel({
      suapId: "123456",
      requester: "José Claudio",
      leavesAt: "28/09/2022 08:00:00",
      arrivesAt: "28/09/2022 17:00:00",
      objective: "Objetivo teste",
      isAuthorized: "Indeferido",
      isDeferred: "Indeferido",
    });

    expect(travel).toBeInstanceOf(Travel);
    expect(travel.isAuthorized).toBe(false);
    expect(travel.isDeferred).toBe(false);
  });

  //
  test("Should be sucessfully instanced - outdated", () => {
    const travel = new Travel({
      suapId: "123456",
      requester: "José Claudio",
      leavesAt: "28/09/2022 08:00:00",
      arrivesAt: "28/09/2022 17:00:00",
      objective: "Objetivo teste",
      isAuthorized: "Fora do Prazo",
      isDeferred: "Fora do Prazo",
    });

    expect(travel).toBeInstanceOf(Travel);
    expect(travel.isAuthorized).toBe(false);
    expect(travel.isDeferred).toBe(false);
  });

  //
  test("Should be sucessfully instanced - is approved", () => {
    const travel = new Travel({
      suapId: "123456",
      requester: "José Claudio",
      leavesAt: "28/09/2022 08:00:00",
      arrivesAt: "28/09/2022 17:00:00",
      objective: "Objetivo teste",
      isAuthorized: "Sim",
      isDeferred: "Deferido",
    });

    expect(travel).toBeInstanceOf(Travel);
    expect(travel.isAuthorized).toBe(true);
    expect(travel.isDeferred).toBe(true);
  });

  //
  test("Should be sucessfully instanced - awaiting evaluation", () => {
    const travel = new Travel({
      suapId: "123456",
      requester: "José Claudio",
      leavesAt: "28/09/2022 08:00:00",
      arrivesAt: "28/09/2022 17:00:00",
      objective: "Objetivo teste",
      isAuthorized: "Aguardando",
      isDeferred: "Avaliar",
    });

    expect(travel).toBeInstanceOf(Travel);
    expect(travel.isAuthorized).toBe(null);
    expect(travel.isDeferred).toBe(null);
  });

  //
  test("Should be a valid list", () => {
    const items = [
      {
        suapId: "123456",
        requester: "José Claudio",
        leavesAt: "28/09/2022 08:00:00",
        arrivesAt: "28/09/2022 17:00:00",
        objective: "Objetivo teste",
        isAuthorized: "Não Autorizado",
        isDeferred: "Não Autorizado",
      },
      {
        suapId: "123457",
        requester: "José Claudio",
        leavesAt: "28/09/2022 08:00:00",
        arrivesAt: "28/09/2022 17:00:00",
        objective: "Objetivo teste",
        isAuthorized: "Não Autorizado",
        isDeferred: "Não Autorizado",
      },
    ];

    const list = Travel.toList(items);

    expect(list.length).toBe(2);
    expect(list[0]).toBeInstanceOf(Travel);
    expect(list[1]).toBeInstanceOf(Travel);
  });

  // end describe
});
