import { describe, expect, it } from "vitest";
import { Puedo } from "../index";
import type { Role } from "../types";

const permissions = {
  page: {
    header: {
      button1: false,
      button2: true,
    },
  },
};

const roles: Role<typeof permissions>[] = [
  {
    id: "admin",
    permissions: {
      page: {
        header: {
          button1: true,
          button2: false,
        },
      },
    },
  },
  {
    id: "customer",
    permissions: {
      page: {
        header: {
          button1: false,
        },
      },
    },
  },
];

const invalidRoles = [
  {
    id: "admin",
    permissions: {
      page: {
        header: {
          button1: true,
          button2: false,
          extraButton: true,
        },
      },
    },
  },
];

const afterMergeRoles = [
  {
    id: "admin",
    permissions: {
      page: {
        header: {
          button1: true,
          button2: false,
        },
      },
    },
  },
  {
    id: "customer",
    permissions: {
      page: {
        header: {
          button1: false,
          button2: true,
        },
      },
    },
  },
];

const adminUser = {
  role: "admin",
};

const customerUser = {
  role: "customer",
};

const nonExistingUser = {
  role: "non_existing",
};

const defaultOptions = {
  accessorKey: "role",
  roles,
  permissions,
};

describe("Puedo", () => {
  it("should create a new instance with provided options", () => {
    const puedo = new Puedo(defaultOptions);

    expect(puedo.accessorKey).toBe("role");
    expect(puedo.roles).toEqual(afterMergeRoles);
  });

  it("should return false if the role is not found", () => {
    const puedo = new Puedo(defaultOptions);

    expect(puedo.can(nonExistingUser, "page.header.button1")).toBe(false);
  });

  it("should return true or false based on the permission", () => {
    const puedo = new Puedo(defaultOptions);

    expect(puedo.can(adminUser, "page.header.button1")).toBe(true);
    expect(puedo.can(customerUser, "page.header.button1")).toBe(false);
    expect(puedo.can(adminUser, "page.header.button2")).toBe(false);
    expect(puedo.can(customerUser, "page.header.button2")).toBe(true);
  });

  it("should throw an error when a role contains extra keys not present in permission", () => {
    const invalidOptions = {
      ...defaultOptions,
      roles: invalidRoles,
    };

    expect(() => new Puedo(invalidOptions)).toThrow();
  });
});
