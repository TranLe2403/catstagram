import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import SingleImageCard from './components/SingleImageCard';
import BreedSelect from './components/BreedSelect';

export type ImageType = {
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

  return (
    <AppStyle>
      <h1>Cat Browser</h1>
      <BreedSelect setSelectedBreed={setSelectedBreed} selectedBreed={selectedBreed} allBreeders={allBreeders} />

      <ImagesContainer>
        {allImages.map((image: ImageType) => <SingleImageCard image={image} />)}
      </ImagesContainer>
    </AppStyle>
  );
}

export default App;
