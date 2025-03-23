export const configTemplate = `
import { Puedo } from "puedo";

const permissions = {
    your_key: false,
};

const adminRole = {
    id: "admin",
    permissions: {
        your_key: true,
    },
};

export const puedo = new Puedo({
    accessorKey: "your_accessor_key", // change with your accessor key
    permissions,
    roles: [adminRole],
});
`;
