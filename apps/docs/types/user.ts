export interface User {
	id: string;
	name: string;
	email: string;
	role: "admin" | "user";
	credits: number;
}
