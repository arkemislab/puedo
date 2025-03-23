import { promises as fs, existsSync } from "node:fs";
import path from "node:path";
import { Command } from "commander";
import { execa } from "execa";
import ora from "ora";
import { z } from "zod";
import { DEFAULT_OUTPUT_PATH } from "../utils/constants";
import { getPackageManager } from "../utils/get-package-manager";
import { handleError } from "../utils/handle-error";
import { logger } from "../utils/logger";
import { configTemplate } from "../utils/templates/config";

const initOptionsSchema = z.object({
  output: z
    .string()
    .optional()
    .describe("the output directory")
    .default(DEFAULT_OUTPUT_PATH),
});

export const initCommand = new Command()
  .name("init")
  .description("Initialize puedo within a project")
  .option("-o, --output <output>", "the output directory")
  .action(async (opts) => {
    try {
      const spinner = ora("Initializing Puedo...").start();

      const options = initOptionsSchema.parse(opts);

      // Install dependencies
      //   const dependencySpinnner = ora("Installing dependencies...").start();
      //   const packageManager = await getPackageManager(process.cwd());
      //   await execa(packageManager, [
      //     packageManager === "npm" ? "install" : "add",
      //     "puedo",
      //   ]);
      //   dependencySpinnner.succeed();

      // Create default files
      const fileSpinner = ora("Creating default file...").start();
      const targetDir = options.output;

      if (!existsSync(targetDir)) {
        await fs.mkdir(targetDir, { recursive: true });
      }

      await fs.writeFile(path.resolve(targetDir, "puedo.ts"), configTemplate);
      fileSpinner.succeed();

      spinner.succeed();
      logger.success("Puedo initialized successfully!");
    } catch (error) {
      logger.break();
      handleError(error);
    }
  });
