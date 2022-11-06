import { Box, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';

type PropsType = {
  setSelectedBreed: React.Dispatch<React.SetStateAction<string>>,
  selectedBreed: string,
  allBreeders: string[]
}

function BreedSelect({ setSelectedBreed, selectedBreed, allBreeders }: PropsType) {
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
