import User from "../models/user";
import { loginResponse } from "./authResponse";

describe("data/types", () => {
  //
  test("should be an authResponse type", () => {
    const data: loginResponse = {
      user: new User({}),
      token: {
        access_token: "token",
        token_type: "Bearer",
        expires_in: 3600,
      },
    };

    console.log("typeof data", typeof data);

    expect(data).toBeDefined();
    expect(data.user).toBeInstanceOf(User);
  });

  //
});
