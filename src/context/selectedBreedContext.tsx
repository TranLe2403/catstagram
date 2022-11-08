import { createContext, useContext } from "react";

type BreedContext = {
  selectedBreed: [string, string],
  setSelectedBreed: (breed: [string, string]) => void;
};
export const SelectedBreedContext = createContext<BreedContext>({
  selectedBreed: ['selected_breed', 'Select Breed'],
  setSelectedBreed: () => { },
});

export const useSelectedBreedContext = () => useContext(SelectedBreedContext);