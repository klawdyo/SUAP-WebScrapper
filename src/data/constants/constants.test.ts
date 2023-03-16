import Constants from "./constants";

describe("constants", () => {
  test("Should match constants", () => {
    //
    expect(Array.isArray(Constants.ALLOWED_CAMPI)).toBeTruthy();
    expect(Constants.ALLOWED_CAMPI).toMatchObject(["IP"]);

    //
    expect(Constants.IS_ALLOWED_ONLY_GOVERNMENT_EMPLOYEES).toBeTruthy();
  });
});
