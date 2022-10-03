import SUAP from ".";
import { load } from "cheerio";

let cookie = "";
const user = process.env.SUAP_USER!.toString();
const pass = process.env.SUAP_PASS!.toString();

beforeAll(async () => {
  // console.log("Inicou o login");
  const suap = new SUAP();
  cookie = await suap.getCookie(user, pass);
  // console.log(cookie);

  // console.log("Finalizou o login");
});

describe("lib/suap/requests", () => {
  //
  it("Should be a successfully get request", async () => {
    const suap = new SUAP();
    const result = await suap.setCookie(cookie).get(`/rh/servidor/${user}/`);

    const $ = load(result);
    const name = $(".title-container h2").text();

    expect(name).toContain(user);
  });

  //
  it("Should returns a 404 error", async () => {
    const suap = new SUAP();
    // Armazeno o resultado na variavel
    const fn = () => suap.setCookie(cookie).get(`/rh/servidor/batata/`);

    await expect(fn).rejects.toMatchObject({
      code: 404,
    });
  });

  //
  it("Should be a successfully post request", async () => {
    const suap = new SUAP();
    const control =
      '{"data": "eJyVVllvFEcQ9sGC117WNnaIFSAiQSJeRbIgkSIhxAMQPxjbE5lwJA+k1bvT3ho8O7PMAfYDUoIN7KBGBKXzjPwPeEh+Q+77VE7lVJREUY4fQL7umd21vaAoK626u7q6qrq+r6vm+U0v7xjoMj/5gH2We1V/wi5P1HxbuOFEeM6dOBeLYEnJ3JwZX1KlF9RFNS5zRkXJQsWvxbXsgJK9hz0fSrLIXYeHLBDzFT/2IhyReaPJOBSmu0OZTzVqvI5NGpB77urd5hEPoyCuRHEgYD9/hIfiBC+7oh1Kf6TXzOM1oQ0NpEtjHuu4HMr+1FfFR4gNOSQWIxF43E11YFZHl55qhnMGfx7Kgi3meexGraPNtR/YInC8KmTDYcQ9mwf2WmEhDoXdsn9DyaF5x4VX5oQsjJzKwpJKZF8Yl9P0JnJzKFxRiVRJ5i6QCIS6BxzZZv60Hi3I23noq5Dj2oHw1BklxzpOu76/ENeRw54pr32o1yWIdnZoi8U6Eh46vqdRPeq77SPDyIaXguIHjAdVnWZ5f4eJeUe4Nk4PMNfnNjNLzY2cIYKiLbLHsdVVdVxdgd0r4JIfR/U4yjTpkMw1QZSbI/gRkRZug/eIO17IeLUaiCqPhErisuwNcBPqSYOknBwWdtwMhbux5yOU3GE9QRCU1zfpObVPTfdi2K+mu2Iq6IMzNJSZGJF5mGDmrKJRmonLNEtFuemY77QzSCMIr1DnyHvUJN0MtGdl/iz0WLRUB179U5Y1eXz3saemLJVtGErJrXgPzBWRc95nyAYdvKIuQ91oZHk4IHsRh6Ip8LilbPIm+7zYdc1rSORwyjDQLhAuj4CcsuJyTPc1aDsoPaZjnQOvZ7ih9yyPaUdCOxPa1aAHbyjandBDDXqYHs/u9QSuwenQVYMNHaZDdASSo8Tj8mVFe2hvpleCsbXzR2VucpGDyq0M7aP9cvPkohNGYZtFWzwDnY3Ic+kjaGNHxzJ8TgKfLgzApxvDYxgymC61YaI5pPsSwFleA91uDR2KRo3XHM+pxEHoM4CEp+fUuRfhUeLQMg6t0NOtQ9s6Dyk6BbujUDtNz9CzcniDzRZmdIYO0HNy5wm9P3sPn7K4wbpGkcoJVdZCNdMI23Bd4nQNwzKn6xhWNqA2TtfpGs29eBf0lnU8dFM/Ik1g40lLpuignrdwXQWuy8D1Vieu43S+BWHb8Iq5aHH9RZUcrIqAB6igUQCRy1OPt1t+bsPPCvzclv26CMa1GteVDxBMJnK07ICzMOCyKOBeOO8HtRB1DO/6kXsUlglDc9C9VdgKx1NJB/3WJuUWrXZenV4xcazj/uoGRc391VTxVR2Y0B3N84SugrrxWU8quqgL0YCp0azi8hAs2yv7qoEf11l5SVmyz/QIPS/JPte/gHQFC5rjeXKqlK6gZeOtOB4ukcjB5pxl9bSEjmN6BUOSWFy3TQGUYx1C5vkXuKNt7OrcCxecOjJXWTAvcLRTwZ+Hp7VGUXoWxFLbYTHby2CAJF/ji8wW9YjUdE5uPQ/iCSDdbGwD3PP8yFQm03K3t9eZEu4f6vuPsc6tCq+QwF4/ukfZ8bjOuiWL7RWKr4sghlIJeKGriiN0wnLo+AHXPofNbIO7EbZO2vRUSKXmw0BbKabrNQjqzwERBIaD3Nadf/ymaqCTjbCOYmyuvBVt1UXvYs22X2wKNOF5BK+DTYlfbx/LOM50W9DPAqUBz/66kIX0ywa9et5ZVLL7JF6B/qpofXqMy+4Tiv66CcLSt6gtKdEbKYU5vUav08VGa6Y336C99KZFb5Xo7ekueseidxN6r0TvJ/RBQh8m9FGJPk7ok4Q+nc7RZ8RQND6H4S/QQr606CuLvk7om5Jx9h1k31v0Q4l+LNFP9DNSQ79A/mtCv1n0O2Z/I75Tiv7REdKfdEf2Mrus+9a6AP9/WKU0JqszJOs/I6I7WTx/mK/AuDzxL4UdoA8=:9XkwAc2cmuj2iwBLO3fNF_IC34KjoLbapoLSJYM5Ynw"}';

    const result = await suap.setCookie(cookie).post(`/json/comum/ano/`, {
      control,
    });

    // console.log(result);

    let list = JSON.parse(result);

    const has = list.hasOwnProperty("total");

    expect(list.hasOwnProperty("total")).toBeTruthy();

    // console.log("has", has);

    // expect(result["total"] > 0).toBeTruthy();

    // expect(name).toContain(user);
  });

  //
  it("Should POST to a non existant url and returns a 404 error", async () => {
    const suap = new SUAP();
    // Armazeno o resultado na variavel
    const fn = suap.setCookie(cookie).post(`/rh/servidor/batata/`, {});

    await expect(fn).rejects.toMatchObject({
      code: 404,
    });
  });

  //
  it("Should POST to a GET url and returns 403", async () => {
    const suap = new SUAP();
    // Armazeno o resultado na variavel
    const fn = suap.setCookie(cookie).post(`/rh/servidor/${user}/`, {});

    await expect(fn).rejects.toMatchObject({
      code: 403,
    });
  });

  //
});
