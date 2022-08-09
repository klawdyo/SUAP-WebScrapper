import { load } from "cheerio";

export default class Diary {
  suapId: number;
  code: string;
  name: string;
  workload?: number;
  classes?: number;
  level?: string;

  constructor(item: Record<string, any>) {
    this.suapId = +item.suapId;
    this.code = item.code;
    this.name = item.name;
    if (item.workload) this.workload = item.workload;
    if (item.classes) this.classes = item.classes;
    if (item.level) this.level = item.level;
  }

  /**
   * Cria um objeto person a partir de um item retornado por um html
   * de um autocomplete
   *
   */
  static fromAutocomplete(diary: autocompleteDiary): Diary | null {
    try {
      const result: Diary = {
        suapId: diary.id,
        code: "",
        name: "",
      };

      const $ = load(diary.text);

      // Regex: https://regexr.com/6rcqt
      const match =
        /(?<id>\d+)\s*-\s*(?<code>\w+\.\d+)\s*-\s*(?<name>.*?)\s*-\s*(?<level>M.dio|Gradua..o)\s*\[(?<workload>\d+)\sh\/(?<classes>\d+)\sAulas\]/i.exec(
          diary.text
        );

      if (match?.groups) {
        const { id, code, name, level, workload, classes } = match?.groups;
        return new Diary({
          suapId: id,
          code,
          name,
          workload: +workload,
          classes: +classes,
          level,
        });
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }
}

/**
 * Tipo de dados para informações recebidas via autocomplete
 */
export type autocompleteDiary = {
  id: number;
  html: string;
  text: string;
};