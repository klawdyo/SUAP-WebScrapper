import SUAP from "lib/suap";
import Person from "data/models/person";
import { controlSearchPeople } from "../values/control";
import { autocompletePerson } from "data/types/autocompletePerson";

export default async function searchPerson(
  term: string,
  cookie: string | string[]
): Promise<Person[]> {
  const suap = new SUAP();

  const result = await suap
    .setCookie(cookie)
    .addHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
      charset: "UTF-8",
    })
    .post("/json/comum/vinculo/", {
      q: term,
      control: controlSearchPeople,
      search_fields: "search",
    });

  const { items = [] } = JSON.parse(result);

  const list = items.map((item: autocompletePerson) =>
    Person.fromAutocomplete(item)
  );

  return list;
}
