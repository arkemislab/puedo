import { promises as fs, existsSync } from "node:fs";
import path from "node:path";
import { Command } from "commander";
import ora from "ora";
import { z } from "zod";
import { DEFAULT_OUTPUT_PATH } from "../utils/constants";
import { handleError } from "../utils/handle-error";
import { logger } from "../utils/logger";
import { kebabCase } from "../utils/string-casing";
import { roleTemplate } from "../utils/templates/role";

const create = new Command().name("create");

const createRoleSchema = z.object({
  name: z.string().describe("The name of the role"),
  output: z
    .string()
    .optional()
    .describe("the output directory")
    .default(DEFAULT_OUTPUT_PATH),
});

create
  .command("role")
  .description("Create a new role")
  .argument("<name>", "The name of the role")
  .option("-o, --output <output>", "the output directory")
  .action(async (name, opts) => {
    try {
      const spinner = ora("Creating a new role...").start();
      const options = createRoleSchema.parse({ name, ...opts });

      const targetFile = path.resolve(
        options.output,
        `${kebabCase(options.name)}.ts`,
      );

      if (existsSync(targetFile)) {
        throw new Error(
          `${options.name}.ts file already exists at ${options.output}`,
        );
      }

      await fs.writeFile(targetFile, roleTemplate({ name: options.name }));

      spinner.succeed();
      logger.success("Role created successfully!");
    } catch (error) {
      logger.break();
      handleError(error);
    }
  });

export { create };
