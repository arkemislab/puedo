import { camelCase, kebabCase } from "../string-casing";

export const roleTemplate = ({
  name,
}: { name: string }) => `export const ${camelCase(name)}Role = {
  id: "${kebabCase(name)}",
  permissions: {
    your_key: true,
  },
};
`;
