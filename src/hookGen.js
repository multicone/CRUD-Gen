import fs, { write } from "fs";
import util from "util";
import {
  hookSource,
  indexSource,
  reducersSource,
  typesSource,
  updaterSource,
} from "./hookCode.js";
const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);

export async function HookGen(name) {
  const folder = process.cwd() + "/src/state/" + name;

  await mkdir(folder);
  await writeFile(`${folder}/index.ts`, indexSource());
  await writeFile(`${folder}/types.ts`, typesSource(name));
  await writeFile(`${folder}/hook.ts`, hookSource(name));
  await writeFile(`${folder}/reducer.ts`, reducersSource(name));
  await writeFile(`${folder}/updater.ts`, updaterSource(name));
}
