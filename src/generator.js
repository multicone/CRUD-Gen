import fs, { write } from "fs";
import util from "util";
import { createSource, indexSource, readSource, updateSource } from "./code.js";
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

export async function Generator(name) {
  const folder = process.cwd() + "/src/routes/" + name;

  await mkdir(folder);
  await writeFile(`${folder}/index.ts`, indexSource(name));
  await writeFile(`${folder}/read.ts`, readSource(name));
  await writeFile(`${folder}/update.ts`, updateSource(name));
  await writeFile(`${folder}/create.ts`, createSource(name));
}
