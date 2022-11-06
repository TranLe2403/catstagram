import React, { useEffect, useState } from 'react';
import { Box, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import axios from 'axios';
import styled from 'styled-components'
import { Link } from 'react-router-dom';

type ImageType = {
  url: string,
  id: string,
}

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
  width: 240px;
`

const ButtonStyle = styled.button`
  background: yellow;
  color: white;
  margin: 8px;
  border: none;
  border-radius: 4px;
  height: 32px;
`

export const DEFAULT_URL = 'https://api.thecatapi.com/v1';

function App() {
  const [allBreeders, setAllBreeder] = useState<string[]>([])
  const [selectedBreed, setSelectedBreed] = useState<string>('Select Breed')
  const [allImages, setAllImages] = useState<ImageType[]>([])
  useEffect(() => {
    const setBreeders = async () => {
      const { data } = await axios.get(`${DEFAULT_URL}/breeds`, { headers: { Authorization: process.env.REACT_APP_API_KEY } });
      setAllBreeder(data.map((item: any) => item.name))
    };
    setBreeders().catch((error) => console.error(error));
  }, [])

  useEffect(() => {
    const findBreed = async () => {
      if (selectedBreed === 'Select Breed') return;
      const { data } = await axios.get(`${DEFAULT_URL}/breeds/search?q=${selectedBreed}`, { headers: { Authorization: process.env.REACT_APP_API_KEY } });
      const { data: images } = await axios.get(`${DEFAULT_URL}/images/search`, { params: { breed_ids: data[0].id, limit: 20 } });
      setAllImages(images.map(({ url, id }: ImageType) => ({ url, id })));
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
          <Select value={selectedBreed} onChange={handleChange}>
            <MenuItem value='Select Breed'>Select Breed</MenuItem>
            {allBreeders.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
      <ImagesContainer>
        {allImages.map(({ url, id }: ImageType) => (
          <ImageBox key={id}>
            <img src={url} />
            <ButtonStyle><Link to={'/' + id}>View Detail</Link></ButtonStyle>
          </ImageBox>
        ))}
      </ImagesContainer>
    </AppStyle>
  );
}

export default App;
