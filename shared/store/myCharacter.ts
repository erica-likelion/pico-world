import type { CharacterName } from "@/entities/character/model/characterMessages";
import { create } from "zustand";

interface MyCharacter {
	name: CharacterName;
	setName: (name: CharacterName) => void;
}

export const MyCharacter = create<MyCharacter>((set) => ({
	name: "츠츠",
	setName: (name) => set({ name }),
}));
