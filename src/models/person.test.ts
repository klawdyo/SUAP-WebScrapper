import Person, { personType } from "./person";

describe("Model Person", () => {
  test("Servidor", () => {
    const servidor = {
      id: 40058,
      html: `<div class="person">             <div class="photo-circle">                 <img src="/media/fotos/75x100/2543.LafUPyr4RD2t.jpg" alt="Foto de Jose Claudio Medeiros de Lima" />             </div>
 <dl><dt class="sr-only">Nome</dt><dd><strong>Jose Claudio Medeiros de Lima</strong> (Mat. 1673621)</dd><dt class="sr-only">Setor</dt><dd><span title="INST FED EDU CIEN TEC DO RN">IFRN</span> &rarr; <span class="admin-setor-uo" title="REITORIA">RE</span> &rarr; <span class="admin-setor-uo" title="DIREÇÃO-GERAL DO CAMPUS IPANGUAÇU">DG/IP</span> &rarr; <span title="Diretoria Acadêmica">DIAC/IP</span> &rarr; <span class="admin-setor" title="Secretaria Acadêmica">SEAC/IP (Secretaria Acadêmica)</span></dd><dt class="sr-only">Cargo</dt><dd>ASSISTENTE EM ADMINISTRACAO (PCIFE) - 701200</dd></dl>         </div>         `,
      text: "Jose Claudio Medeiros de Lima (1673621) (Servidor)",
    };
    const result = Person.fromAutocomplete(servidor);

    console.log(result);
    expect(result).toBeInstanceOf(Person);

    expect(result).toMatchObject({
      suapId: 40058,
      image:
        "https://suap.ifrn.edu.br/media/fotos/75x100/2543.LafUPyr4RD2t.jpg",
      name: "Jose Claudio Medeiros de Lima",
      matricula: 1673621,
      type: personType.SERVIDOR,
    });
  });

  //*

  test("Aluno", () => {
    const aluno = {
      id: 367830,
      html: `<div class=\"person\">             <div class=\"photo-circle\">
       <img src=\"/static/comum/img/default.jpg\" alt=\"Foto de Ana Vit\u00f3ria Barbalho da Siva (202110510650035)\" />             </div>             <dl><dt class=\"sr-only\">Nome</dt><dd><strong>Ana Vit\u00f3ria Barbalho da Siva (202110510650035)</strong></dd><dt class=\"sr-only\">Curso</dt><dd>051065 - ProiTEC - Programa de Inicia\u00e7\u00e3o Tecnol\u00f3gica e Cidadania (CAMPUS IPANGUA\u00c7U)</dd><dt class=\"sr-only\">Caracteriza\u00e7\u00e3o</dt><dd class=\"false\">N\u00e3o realizou caracteriza\u00e7\u00e3o</dd><dt class=\"sr-only\">Inscri\u00e7\u00e3o</dt><dd class=\"false\">N\u00e3o inscrito em programa</dd></dl>         </div>`,
      text: "Ana Vit\u00f3ria Barbalho da Siva (202110510650035) (Aluno)",
    };
    const result = Person.fromAutocomplete(aluno);

    console.log(result);
    expect(result).toBeInstanceOf(Person);

    expect(result).toMatchObject({
      suapId: 367830,
      name: "Ana Vitória Barbalho da Siva",
      image: "https://suap.ifrn.edu.br/static/comum/img/default.jpg",
      matricula: 202110510650035,
      course:
        "051065 - ProiTEC - Programa de Iniciação Tecnológica e Cidadania (CAMPUS IPANGUAÇU)",
      type: personType.ALUNO,
    });
  });

  test("Terceirizado", () => {
    const terceirizado = {
      id: 225934,
      html: '<div class="person">             <div class="photo-circle">                 <img src="/static/comum/img/default.jpg" alt="Foto de Francisco Elizon Dantas" />             </div>             <dl><dt class="sr-only">Nome</dt><dd><strong>Francisco Elizon Dantas</strong></dd><dt class="sr-only">Categoria</dt><dd>Prestador de Serviço</dd><dt class="sr-only">Setor</dt><dd><span title="INST FED EDU CIEN TEC DO RN">IFRN</span> &rarr; <span class="admin-setor-uo" title="REITORIA">RE</span> &rarr; <span class="admin-setor-uo" title="DIREÇÃO-GERAL DO CAMPUS IPANGUAÇU">DG/IP</span> &rarr; <span title="Diretoria de Administração">DIAD/IP</span> &rarr; <span class="admin-setor" title="Coordenação de Serviços Gerais e Manutenção">COSGEM/IP (Coordenação de Serviços Gerais e Manutenção)</span></dd></dl>         </div>         ',
      text: "Francisco Elizon Dantas (02539150403) (Prestador de serviço)",
    };
    const result = Person.fromAutocomplete(terceirizado);

    console.log(result);
    expect(result).toBeInstanceOf(Person);

    expect(result).toMatchObject({
      suapId: 225934,
      name: "Francisco Elizon Dantas",
      image: "https://suap.ifrn.edu.br/static/comum/img/default.jpg",
      cpf: "02539150403",
      sector:
        "IFRN → RE → DG/IP → DIAD/IP → COSGEM/IP (Coordenação de Serviços Gerais e Manutenção)",
      type: personType.TERCEIRIZADO,
    });
  });

  test("Terceirizada", () => {
    const terceirizada = {
      id: 307838,
      html: '<div class="person">             <div class="photo-circle">                 <img src="/static/comum/img/default.jpg" alt="Foto de Aline Tomaz" />             </div>             <dl><dt class="sr-only">Nome</dt><dd><strong>Aline Tomaz</strong></dd><dt class="sr-only">Categoria</dt><dd>Prestador de Servi\u00e7o</dd><dt class="sr-only">Setor</dt><dd><span title="INST FED EDU CIEN TEC DO RN">IFRN</span> &rarr; <span class="admin-setor-uo" title="REITORIA">RE</span> &rarr; <span class="admin-setor-uo" title="DIRE\u00c7\u00c3O-GERAL DO CAMPUS IPANGUA\u00c7U">DG/IP</span> &rarr; <span title="Diretoria Acad\u00eamica">DIAC/IP</span> &rarr; <span class="admin-setor" title="Equipe T\u00e9cnico-Pedag\u00f3gica do Campus Ipangua\u00e7u">ETEP/IP (Equipe T\u00e9cnico-Pedag\u00f3gica do Campus Ipangua\u00e7u)</span></dd></dl>         </div>         ',
      text: "Aline Tomaz (01041626436) (Prestador de servi\u00e7o)",
    };
    const result = Person.fromAutocomplete(terceirizada);

    console.log(result);
    expect(result).toBeInstanceOf(Person);

    expect(result).toMatchObject({
      suapId: 307838,
      name: "Aline Tomaz",
      image: "https://suap.ifrn.edu.br/static/comum/img/default.jpg",
      cpf: "01041626436",
      sector:
        "IFRN → RE → DG/IP → DIAC/IP → ETEP/IP (Equipe Técnico-Pedagógica do Campus Ipanguaçu)",
      type: personType.TERCEIRIZADO,
    });
  });

  // Esta busca deve retornar um aluno
  test("Aluno - A partir da busca de alunos", () => {
    const aluno = {
      id: 313838,
      html: '<div class="person">             <div class="photo-circle">                 <img src="/media/alunos/75x100/313838.OjAU3vXkpsW0.jpeg" alt="Foto de Naciso Martins Xavier Filho (20221054010028)" />             </div>             <dl><dt class="sr-only">Nome</dt><dd><strong>Naciso Martins Xavier Filho (20221054010028)</strong></dd><dt class="sr-only">Curso</dt><dd>05401 - T\u00e9cnico de N\u00edvel M\u00e9dio em Inform\u00e1tica, na Forma Integrado (2012) - Campus Ipangua\u00e7u (CAMPUS IPANGUA\u00c7U)</dd><dt class="sr-only">Caracteriza\u00e7\u00e3o</dt><dd class="true">Realizou caracteriza\u00e7\u00e3o</dd><dt class="sr-only">Inscri\u00e7\u00e3o</dt><dd class="false">N\u00e3o inscrito em programa</dd></dl>         </div>',
      text: "Naciso Martins Xavier Filho (20221054010028)",
    };
    const result = Person.fromAutocomplete(aluno, personType.ALUNO);

    console.log(result);
    expect(result).toBeInstanceOf(Person);

    // expect(result).toMatchObject({
    //   suapId: 367830,
    //   name: "Ana Vitória Barbalho da Siva",
    //   image: "https://suap.ifrn.edu.br/static/comum/img/default.jpg",
    //   matricula: 202110510650035,
    //   course:
    //     "051065 - ProiTEC - Programa de Iniciação Tecnológica e Cidadania (CAMPUS IPANGUAÇU)",
    //   type: personType.ALUNO,
    // });
  });
  //*/
});
