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

const ImagesContainer = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

const ImageStyle = styled.img`
  width: 240px;
`

const ButtonStyle = styled.button`
  background: blue;
  color: white;
  margin: 8px;
  border: none;
  border-radius: 4px;
  height: 32px;
`

function App() {
  const [allBreeds, setAllBreed] = useState<string[]>([])
  const [selectedBreed, setSelectedBreed] = useState<string>('Select Breed')
  const [breedFound, setBreedFound] = useState({})
  const [allImages, setAllImages] = useState<{ url: string, id: string }[]>([])

  useEffect(() => {
    const getBreeds = async () => {
      const { data } = await axios.get('https://api.thecatapi.com/v1/breeds', { headers: { Authorization: process.env.REACT_APP_API_KEY } });
      setAllBreed(data.map((item: any) => item.name))
    };
    getBreeds().catch((error) => console.error(error));
  }, [])

  useEffect(() => {
    const findBreed = async () => {
      if (selectedBreed === 'Select Breed') return;
      const { data } = await axios.get(`https://api.thecatapi.com/v1/breeds/search?q=${selectedBreed}`, { headers: { Authorization: process.env.REACT_APP_API_KEY } });
      setBreedFound(data)
      const { data: images } = await axios.get(`https://api.thecatapi.com/v1/images/search`, { params: { breed_ids: data[0].id, limit: 20 } });
      setAllImages(images.map((item: any) => ({ url: item.url, id: item.id })));
    };
    findBreed().catch((error) => console.error(error));
  }, [selectedBreed])

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
      <ImagesContainer>
      {allImages.map(({ url, id }: { url: string, id: string }) => (
        <ImageBox key={id}>
          <ImageStyle src={url} />
          <ButtonStyle>View Detail</ButtonStyle>
        </ImageBox>
      ))}
      </ImagesContainer>
    </AppStyle>
  );
}

export default App;
