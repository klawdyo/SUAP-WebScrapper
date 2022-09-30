import SUAP from ".";

const cookie = [
  "__Host-csrftoken=dT7jsfEPXeL7mIUDeBYykKIXovlrdxeyKgG4OPj1yVyAUjbPbc5NZZC4LhFdJHGy; expires=Sat, 29 Oct 2022 13:27:46 GMT; HttpOnly; Max-Age=2581200; Path=/; SameSite=Lax; Secure; HttpOnly; HttpOnly",
  '__Host-suap-control="gAAAAABjNceCUgtzyNY9mPAN15rx8lJ_kum7356R_zt5VJmbvuGav2IvZ2nrVAqkuitubhUGscs7Ir7a8vdPXuRutctj94bwSHKLXDF2j5Ni6v9DIWQf8eLFsSwYaN9IHJ3a--Gq635_kDI7ShX0DIEw9lEK6KDnLHWik5xq8ZTBgqcvA-RAhJA="; expires=Wed, 28 Dec 2022 13:27:46 GMT; Max-Age=7765200; Path=/; SameSite=Strict; Secure; HttpOnly; HttpOnly',
  "__Host-sessionid=g97tlr7xr3mrnbq3f4025dp712312z88; expires=Fri, 30 Sep 2022 16:27:46 GMT; HttpOnly; Max-Age=86400; Path=/; SameSite=Lax; Secure; HttpOnly; HttpOnly",
];

describe("lib/suap/check_has_logged_cookie", () => {
  //
  it("Should returns an array cookies", () => {
    //
    const isLogged = SUAP.checkHasLoggedCookies(cookie);

    //
    expect(isLogged).toBeDefined();
  });

  //
  it("Should returns a 403 error", async () => {
    // Remove o cookie de logado
    const _cookie = [cookie[0], cookie[2]];

    //
    await expect(() => SUAP.checkHasLoggedCookies(_cookie)).toThrow();
  });

  //
  it("Should throws", async () => {
    //
    await expect(() => SUAP.checkHasLoggedCookies(undefined)).toThrow();
  });
});
