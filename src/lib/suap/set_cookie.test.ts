import SUAP from ".";

const arrayCookie = [
  "__Host-csrftoken=dT7jsfEPXeL7mIUDeBYykKIXovlrdxeyKgG4OPj1yVyAUjbPbc5NZZC4LhFdJHGy",
  '__Host-suap-control="gAAAAABjNceCUgtzyNY9mPAN15rx8lJ_kum7356R_zt5VJmbvuGav2IvZ2nrVAqkuitubhUGscs7Ir7a8vdPXuRutctj94bwSHKLXDF2j5Ni6v9DIWQf8eLFsSwYaN9IHJ3a--Gq635_kDI7ShX0DIEw9lEK6KDnLHWik5xq8ZTBgqcvA-RAhJA="',
  "__Host-sessionid=g97tlr7xr3mrnbq3f4025dp712312z88",
];

const stringCookie =
  '__Host-csrftoken=dT7jsfEPXeL7mIUDeBYykKIXovlrdxeyKgG4OPj1yVyAUjbPbc5NZZC4LhFdJHGy; __Host-suap-control="gAAAAABjNceCUgtzyNY9mPAN15rx8lJ_kum7356R_zt5VJmbvuGav2IvZ2nrVAqkuitubhUGscs7Ir7a8vdPXuRutctj94bwSHKLXDF2j5Ni6v9DIWQf8eLFsSwYaN9IHJ3a--Gq635_kDI7ShX0DIEw9lEK6KDnLHWik5xq8ZTBgqcvA-RAhJA="; __Host-sessionid=g97tlr7xr3mrnbq3f4025dp712312z88';

// console.log(_cookies);

describe("lib/suap/set_cookie", () => {
  //
  it("Should set cookies as array", async () => {
    const suap = new SUAP();
    suap.setCookie(arrayCookie);

    const cookies = suap.cookies;

    expect(Array.isArray(cookies)).toBeTruthy();
    expect(cookies).toMatchObject(arrayCookie);
  });

  //
  it("Should set cookies as string", async () => {
    const suap = new SUAP();
    suap.setCookie(stringCookie);

    const cookies = suap.cookies;

    expect(Array.isArray(cookies)).toBeTruthy();
    expect(cookies).toMatchObject(arrayCookie);
  });

  //
  it("Should set cookies as null", async () => {
    const suap = new SUAP();
    suap.setCookie(null);

    const cookies = suap.cookies;

    expect(Array.isArray(cookies)).toBeTruthy();
    expect(cookies).toMatchObject([]);
  });

  //
  it("Should set cookies as undefined", async () => {
    const suap = new SUAP();
    suap.setCookie(undefined);

    const cookies = suap.cookies;

    expect(Array.isArray(cookies)).toBeTruthy();
    expect(cookies).toMatchObject([]);
  });
});
