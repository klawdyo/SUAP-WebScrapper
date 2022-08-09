import SUAP from "lib/suap";
import Person, { autocompletePerson } from "models/person";
import { controlSearchPeople } from "../values/control";

export default async function searchPerson(
  term: string,
  cookie: string | string[]
) {
  const result = await SUAP.setCookie(cookie)
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