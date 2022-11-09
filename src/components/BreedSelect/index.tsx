import { Box, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useSelectedBreedContext } from '../../context/selectedBreedContext';
import { BreedType, ImageType } from '../../types';

function BreedSelect({
  allBreeds,
  setPage,
  setAllImages
}: {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  allBreeds: BreedType[];
  setAllImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
}) {
  const { selectedBreed, setSelectedBreed } = useSelectedBreedContext();
  const handleChange = (e: SelectChangeEvent) => {
    const event = e.target.value as string;
    const foundItem = allBreeds.find(([, name]) => name === event);
    const breed_id = foundItem === undefined ? 'selected_breed' : foundItem[0];
    setPage(0);
    setAllImages([]);
    setSelectedBreed([breed_id, event]);
  };

  return (
    <>
      <label>Breed</label>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select sx={{ height: 40 }} value={selectedBreed[1]} onChange={handleChange}>
            <MenuItem value="Select Breed">Select Breed</MenuItem>
            {allBreeds.map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default BreedSelect;
