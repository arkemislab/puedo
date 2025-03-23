#!/usr/bin/env node
import { Command } from "commander";

import { create } from "./commands/create";
import { initCommand } from "./commands/init";
import { getPackageInfo } from "./utils/get-package-info";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

async function main() {
  const packageInfo = await getPackageInfo();

  const program = new Command()
    .name("puedo")
    .description("Puedo CLI")
    .version(
      packageInfo.version || "1.0.0",
      "-v, --version",
      "display the version number",
    );

  program.addCommand(initCommand);
  program.addCommand(create);

  program.parse();
}

main();
