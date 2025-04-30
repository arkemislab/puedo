"use client";

import type { User } from "@/types/user";
import { type ReactNode, createContext, useContext, useState } from "react";

interface UserContextType {
	currentUser: User;
	switchUser: (userId: string) => void;
	getAllAvailableUsers: () => User[];
}

const fakeUsers: User[] = [
	{
		id: "1",
		name: "John Admin",
		email: "john@example.com",
		role: "admin",
		credits: 100,
	},
	{
		id: "2",
		name: "Jane User",
		email: "jane@example.com",
		role: "user",
		credits: 11,
	},
];

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
	const [currentUser, setCurrentUser] = useState<User>(fakeUsers[0]);

	const switchUser = (userId: string) => {
		const newUser = fakeUsers.find((user) => user.id === userId);
		if (newUser) {
			setCurrentUser(newUser);
		}
	};

	const getAllAvailableUsers = () => fakeUsers;

	return (
		<UserContext.Provider
			value={{
				currentUser,
				switchUser,
				getAllAvailableUsers,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	const context = useContext(UserContext);
	if (context === undefined) {
		throw new Error("useUser must be used within a UserProvider");
	}
	return context;
}
