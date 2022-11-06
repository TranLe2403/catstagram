import { createContext, useContext } from "react";

type BreedContext = {
  selectedBreed: string;
  setSelectedBreed: (breed: string) => void;
};
export const SelectedBreedContext = createContext<BreedContext>({
    selectedBreed: '',
    setSelectedBreed: () => {},
});

export const useSelectedBreedContext = () => useContext(SelectedBreedContext);