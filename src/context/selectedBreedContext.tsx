import { createContext, useContext } from "react";
import { BreedType } from "../types";

type BreedContext = {
  selectedBreed: BreedType,
  setSelectedBreed: (breed: BreedType) => void;
};
export const SelectedBreedContext = createContext<BreedContext>({
  selectedBreed: ['selected_breed', 'Select Breed'],
  setSelectedBreed: () => { },
});

export const useSelectedBreedContext = () => useContext(SelectedBreedContext);