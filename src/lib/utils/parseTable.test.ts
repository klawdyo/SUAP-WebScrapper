import parseTable from "./parseTable";

const table = `
<table class="mb-2"><thead><tr><th>#</th><th><input type="checkbox" onchange="var is = this.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('input');for(var i=0; i<is.length; i++){ is[i].checked = this.checked;}"></th><th>Matrícula</th><th>Nome</th><th>Campus</th><th>Data de Nascimento</th><th>Descrição do Curso</th></tr></thead><tbody><tr><td>1</td><td><input value="269054" name="select_aluno" type="checkbox"></td><td><a target="_blank" href="/edu/aluno/20201053050007/">20201053050007</a></td><td>Damiana Eduarda Avelino da Silva</td><td>IP</td><td>11/11/1997</td><td>Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu</td></tr><tr><td>2</td><td><input value="246056" name="select_aluno" type="checkbox"></td><td><a target="_blank" href="/edu/aluno/20191053050012/">20191053050012</a></td><td>ELIOMARA DO NASCIMENTO BARACHO</td><td>IP</td><td>20/09/1999</td><td>Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu</td></tr><tr><td>3</td><td><input value="247374" name="select_aluno" type="checkbox"></td><td><a target="_blank" href="/edu/aluno/20191053050016/">20191053050016</a></td><td>Erivelton Oliveira Miranda</td><td>IP</td><td>15/12/1997</td><td>Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu</td></tr><tr><td>4</td><td><input value="268911" name="select_aluno" type="checkbox"></td><td><a target="_blank" href="/edu/aluno/20201053050002/">20201053050002</a></td><td>Francinaide Beatriz Morais da Silva</td><td>IP</td><td>06/08/1996</td><td>Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu</td></tr><tr><td>5</td><td><input value="269026" name="select_aluno" type="checkbox"></td><td><a target="_blank" href="/edu/aluno/20201053050005/">20201053050005</a></td><td>Francisca Gabriela dos Santos Tavares</td><td>IP</td><td>02/05/1995</td><td>Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu</td></tr><tr><td>6</td><td><input value="246054" name="select_aluno" type="checkbox"></td><td><a target="_blank" href="/edu/aluno/20191053050011/">20191053050011</a></td><td>Gabriel Silva de Souza</td><td>IP</td><td>19/12/1999</td><td>Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu</td></tr><tr><td>7</td><td><input value="269202" name="select_aluno" type="checkbox"></td><td><a target="_blank" href="/edu/aluno/20201053050013/">20201053050013</a></td><td>Jessi Carla Melo de França</td><td>IP</td><td>29/12/1997</td><td>Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu</td></tr><tr><td>8</td><td><input value="271883" name="select_aluno" type="checkbox"></td><td><a target="_blank" href="/edu/aluno/20201053050019/">20201053050019</a></td><td>Kalina Valentim de Lima Barbalho</td><td>IP</td><td>14/07/1982</td><td>Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu</td></tr><tr><td>9</td><td><input value="227159" name="select_aluno" type="checkbox"></td><td><a target="_blank" href="/edu/aluno/20181053050034/">20181053050034</a></td><td>Leandro Bezerra da Silva</td><td>IP</td><td>21/03/1995</td><td>Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu</td></tr><tr><td>10</td><td><input value="269205" name="select_aluno" type="checkbox"></td><td><a target="_blank" href="/edu/aluno/20201053050014/">20201053050014</a></td><td>Maria Karolainy Fonseca da Cruz</td><td>IP</td><td>13/09/1999</td><td>Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu</td></tr><tr><td>11</td><td><input value="269000" name="select_aluno" type="checkbox"></td><td><a target="_blank" href="/edu/aluno/20201053050003/">20201053050003</a></td><td>MERCIA MARIA DE SOUZA TAVARES</td><td>IP</td><td>06/02/1976</td><td>Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu</td></tr><tr><td>12</td><td><input value="181813" name="select_aluno" type="checkbox"></td><td><a target="_blank" href="/edu/aluno/20161053050005/">20161053050005</a></td><td>Rhanflly Cabral Cortês Erculino</td><td>IP</td><td>28/01/1995</td><td>Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu</td></tr><tr><td>13</td><td><input value="274367" name="select_aluno" type="checkbox"></td><td><a target="_blank" href="/edu/aluno/20201053050040/">20201053050040</a></td><td>Sabrina Ingrid Gomes Silva</td><td>IP</td><td>09/04/2000</td><td>Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu</td></tr><tr><td>14</td><td><input value="274487" name="select_aluno" type="checkbox"></td><td><a target="_blank" href="/edu/aluno/20201053050041/">20201053050041</a></td><td>Vanessa Pereira da Costa</td><td>IP</td><td>08/09/1999</td><td>Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu</td></tr></tbody></table>
`;

describe("parseTable", () => {
  //
  it("Should returns a parsed table with undefined headers ", () => {
    const result = parseTable(table);

    expect(result.length).toBe(14);

    expect(result[0]).toMatchObject({
      "#": "1",
      id: "269054",
      Matrícula: "20201053050007",
      Nome: "Damiana Eduarda Avelino da Silva",
      Campus: "IP",
      "Data de Nascimento": "11/11/1997",
      "Descrição do Curso":
        "Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu",
    });
  });

  //
  it("Should returns a parsed table with defined headers ", () => {
    const headers = [
      "seq",
      "id",
      "matricula",
      "name",
      "campus",
      "birth",
      "course",
    ];

    const result = parseTable(table, headers);

    expect(result.length).toBe(14);

    expect(result[0]).toMatchObject({
      seq: "1",
      id: "269054",
      matricula: "20201053050007",
      name: "Damiana Eduarda Avelino da Silva",
      campus: "IP",
      birth: "11/11/1997",
      course:
        "Técnico de Nível Médio em Agroecologia, na Forma Integrada, na Modalidade EJA (2012) - Campus Ipanguaçu",
    });
  });

  //
  it("Should returns an empty array ", () => {
    const result = parseTable("");

    expect(result).toMatchObject([]);
  });
});
