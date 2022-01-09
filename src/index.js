#!/usr/bin/env node

import { program } from "commander";
import { Generator } from "./generator.js";
import { HookGen } from "./hookGen.js";

program.version("0.0.1");
program
  .command("s <name>")
  .description("Generate CRUD")
  .action((name) => {
    Generator(name);
  });

program
  .command("h <name>")
  .description("Generate redux state")
  .action((name) => {
    HookGen(name)
  });
program.parse(process.argv);
