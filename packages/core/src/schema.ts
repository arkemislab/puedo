import { z } from "zod";
import type { Permission } from "./types";

const permissionValueSchema = z.boolean();
const permissionSchema: z.ZodType<Permission> = z.lazy(() =>
  z.record(z.union([permissionValueSchema, permissionSchema])),
);

export const createPermissionSchema = <T extends Permission>(
  permission: T,
): z.ZodType<T> => {
  return z.lazy(() => {
    const schema: Record<string, z.ZodType<any>> = {};

    for (const [key, value] of Object.entries(
      permission as Record<string, unknown>,
    )) {
      schema[key] =
        typeof value === "object" && value !== null
          ? createPermissionSchema(value as Permission).optional()
          : permissionValueSchema.optional();
    }

    return z.object(schema).strict() as unknown as z.ZodType<T>;
  });
};

export const roleSchema = <T extends Permission>(
  permissionsSchema: z.ZodType<T>,
) =>
  z.object({
    id: z.string().min(1),
    permissions: permissionsSchema,
  });
