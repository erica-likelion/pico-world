import { create } from "zustand";

interface MyCharacter {
	name: string;
	setName: (name: string) => void;
}

export const MyCharacter = create<MyCharacter>((set) => ({
	name: "츠츠",
	setName: (name) => set({ name }),
}));
