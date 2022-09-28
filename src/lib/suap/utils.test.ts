import { cookieParser, getCSRFMmiddlewareToken } from "./utils";

const data = (merge = {}) => ({});

describe("lib/utils", () => {
  //
  test("Should be cookies string", () => {
    const str = `__Host-csrftoken=exagYE4GjwGCBp3FGmFUoLVKAuDXW75Au4OcIL5Ung39gaYqq6SwmYLdlsS06u0M; __Host-suap-control="gAAAAABjNDxxDa7Z7QzcHbSZihnuZorHU9EmJfZiNqIyvUHFgMltXLzyFlsq_HjkLtEPiDo7CoVIjVR3srwWwnLEwb90slyj5VuPZQwr9zeyLeOEeheejWOfZY2ammlDH5EOeY7mefl3pXdPnAjSvl8sziRH7dU51S-k8IlwLechHbJssXUew4c="; __Host-sessionid=ytegtii6mgdzdaeqnawzeau3ymmum77i`;

    const cookies = cookieParser(str);

    expect(cookies).toBe(str);
  });

  //
  test("Should remove unpattern cookies from string", () => {
    const input = `__Host-csrftoken=exagYE4GjwGCBp3FGmFUoLVKAuDXW75Au4OcIL5Ung39gaYqq6SwmYLdlsS06u0M; __Host-suap-control="gAAAAABjNDxxDa7Z7QzcHbSZihnuZorHU9EmJfZiNqIyvUHFgMltXLzyFlsq_HjkLtEPiDo7CoVIjVR3srwWwnLEwb90slyj5VuPZQwr9zeyLeOEeheejWOfZY2ammlDH5EOeY7mefl3pXdPnAjSvl8sziRH7dU51S-k8IlwLechHbJssXUew4c="; __jose=claudio; __Host-sessionid=ytegtii6mgdzdaeqnawzeau3ymmum77i`;
    const expected = `__Host-csrftoken=exagYE4GjwGCBp3FGmFUoLVKAuDXW75Au4OcIL5Ung39gaYqq6SwmYLdlsS06u0M; __Host-suap-control="gAAAAABjNDxxDa7Z7QzcHbSZihnuZorHU9EmJfZiNqIyvUHFgMltXLzyFlsq_HjkLtEPiDo7CoVIjVR3srwWwnLEwb90slyj5VuPZQwr9zeyLeOEeheejWOfZY2ammlDH5EOeY7mefl3pXdPnAjSvl8sziRH7dU51S-k8IlwLechHbJssXUew4c="; __Host-sessionid=ytegtii6mgdzdaeqnawzeau3ymmum77i`;

    const cookies = cookieParser(input);

    expect(cookies).toBe(expected);
  });

  //
  test("Should remove cookies from array", () => {
    const input = [
      "__Host-csrftoken=exagYE4GjwGCBp3FGmFUoLVKAuDXW75Au4OcIL5Ung39gaYqq6SwmYLdlsS06u0M",
      '__Host-suap-control="gAAAAABjNDxxDa7Z7QzcHbSZihnuZorHU9EmJfZiNqIyvUHFgMltXLzyFlsq_HjkLtEPiDo7CoVIjVR3srwWwnLEwb90slyj5VuPZQwr9zeyLeOEeheejWOfZY2ammlDH5EOeY7mefl3pXdPnAjSvl8sziRH7dU51S-k8IlwLechHbJssXUew4c="',
      // "__jose=claudio",
      "__Host-sessionid=ytegtii6mgdzdaeqnawzeau3ymmum77i",
    ];
    const expected = `__Host-csrftoken=exagYE4GjwGCBp3FGmFUoLVKAuDXW75Au4OcIL5Ung39gaYqq6SwmYLdlsS06u0M; __Host-suap-control="gAAAAABjNDxxDa7Z7QzcHbSZihnuZorHU9EmJfZiNqIyvUHFgMltXLzyFlsq_HjkLtEPiDo7CoVIjVR3srwWwnLEwb90slyj5VuPZQwr9zeyLeOEeheejWOfZY2ammlDH5EOeY7mefl3pXdPnAjSvl8sziRH7dU51S-k8IlwLechHbJssXUew4c="; __Host-sessionid=ytegtii6mgdzdaeqnawzeau3ymmum77i`;

    const cookies = cookieParser(input);

    expect(cookies).toBe(expected);
  });

  //
  test("Should remove unpattern cookies from array", () => {
    const input = [
      "__Host-csrftoken=exagYE4GjwGCBp3FGmFUoLVKAuDXW75Au4OcIL5Ung39gaYqq6SwmYLdlsS06u0M",
      '__Host-suap-control="gAAAAABjNDxxDa7Z7QzcHbSZihnuZorHU9EmJfZiNqIyvUHFgMltXLzyFlsq_HjkLtEPiDo7CoVIjVR3srwWwnLEwb90slyj5VuPZQwr9zeyLeOEeheejWOfZY2ammlDH5EOeY7mefl3pXdPnAjSvl8sziRH7dU51S-k8IlwLechHbJssXUew4c="',
      "__jose=claudio",
      "__Host-sessionid=ytegtii6mgdzdaeqnawzeau3ymmum77i",
    ];
    const expected = `__Host-csrftoken=exagYE4GjwGCBp3FGmFUoLVKAuDXW75Au4OcIL5Ung39gaYqq6SwmYLdlsS06u0M; __Host-suap-control="gAAAAABjNDxxDa7Z7QzcHbSZihnuZorHU9EmJfZiNqIyvUHFgMltXLzyFlsq_HjkLtEPiDo7CoVIjVR3srwWwnLEwb90slyj5VuPZQwr9zeyLeOEeheejWOfZY2ammlDH5EOeY7mefl3pXdPnAjSvl8sziRH7dU51S-k8IlwLechHbJssXUew4c="; __Host-sessionid=ytegtii6mgdzdaeqnawzeau3ymmum77i`;

    const cookies = cookieParser(input);

    expect(cookies).toBe(expected);
  });

  //
  test("Should return empty string if no params is inputed", () => {
    expect(cookieParser("")).toBe("");
    expect(cookieParser()).toBe("");
    expect(cookieParser(undefined)).toBe("");
  });

  //
  test("Should retorn CSRFMiidleware Token from login page html", () => {
    const html = `<form action="" method="post" autocomplete="off"><input type="hidden" name="csrfmiddlewaretoken" value="kh9fHSxPaW5Oshu18TtCHHM0z7PpQmnjAONbrZy3eGsl72pMSDGeFUCtk54s0Jiv"><div class="form-row"><label for="id_username" class="required">`;

    const token = getCSRFMmiddlewareToken(html);

    expect(token).toBe(
      "kh9fHSxPaW5Oshu18TtCHHM0z7PpQmnjAONbrZy3eGsl72pMSDGeFUCtk54s0Jiv"
    );
  });

  //
});
