import dotenv from "dotenv";
import { join } from "path";

// console.log(__dirname + "/../.env.test");

const path = join(__dirname, "..", ".env.test");

console.log(path);

dotenv.config({ path });
