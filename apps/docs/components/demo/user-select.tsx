"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUser } from "./user-context";

export function UserSelect() {
  const { currentUser, switchUser, getAllAvailableUsers } = useUser();

  return (
    <Select value={currentUser.id} onValueChange={switchUser}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select user" />
      </SelectTrigger>
      <SelectContent>
        {getAllAvailableUsers().map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name} ({user.role})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
