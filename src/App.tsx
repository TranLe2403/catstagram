import React, { useEffect, useState } from 'react';
import { Box, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import styled from 'styled-components'

const AppStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

function App() {
  const [allBreeds, setAllBreed] = useState<string[]>([])
  const [selectedBreed, setSelectedBreed] = useState<string>('Select Breed')

  useEffect(() => {
    const getBreeds = async () => {
      const { data } = await axios.get('https://api.thecatapi.com/v1/breeds', { headers: { Authorization: process.env.REACT_APP_API_KEY } });
      setAllBreed(data.map((item: any) => item.name))
    };
    getBreeds().catch((error) => console.error(error));
  }, [])

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedBreed(event.target.value as string);
  };

  return (
    <AppStyle>
      <h1>Cat Browser</h1>
      <h2>Breed</h2>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedBreed}
            onChange={handleChange}
          >
            <MenuItem value='Select Breed'>Select Breed</MenuItem>
            {allBreeds.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
    </AppStyle>
  );
}

export default App;
