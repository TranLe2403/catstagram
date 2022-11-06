import { Box, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { useSelectedBreedContext } from '../../context/selectedBreedContext';

type PropsType = {
  allBreeders: string[]
}

function BreedSelect({ allBreeders }: PropsType) {
  const { selectedBreed, setSelectedBreed } = useSelectedBreedContext();
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedBreed(event.target.value as string);
  };

  return (
    <>
      <label>Breed</label>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select value={selectedBreed} onChange={handleChange}>
            <MenuItem value='Select Breed'>Select Breed</MenuItem>
            {allBreeders.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}

export default BreedSelect;
