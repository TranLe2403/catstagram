/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext, useContext } from 'react';
import { BreedType, ImageType } from '../types';

type BreedContextType = {
  selectedBreed: BreedType;
  setSelectedBreed: (breed: BreedType) => void;
  breedImages: ImageType[];
  setBreedImages: (breedImages: ImageType[]) => void;
};
export const BreedContext = createContext<BreedContextType>({
  selectedBreed: ['selected_breed', 'Select Breed'],
  breedImages: [],
  setSelectedBreed: () => {},
  setBreedImages: () => {}
});

export const useBreedContext = () => useContext(BreedContext);
