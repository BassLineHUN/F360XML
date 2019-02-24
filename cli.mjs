import fs from "fs";
import merger from "./merger.mjs";

const german = fs.readFileSync("german.xml", "utf-8").split("\n").filter((a, i) => i > -1);
const hun = fs.readFileSync("hun.xml", "utf-8").split("\n");

const result = merger(german, hun);

console.log(result.join("\n"));
