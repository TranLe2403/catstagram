import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import SingleImageCard from './components/SingleImageCard';
import BreedSelect from './components/BreedSelect';
import { SelectedBreedContext } from './context/selectedBreedContext';

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
  const [selectedBreed, setSelectedBreed] = useState<string>('Select Breed') //.should use useContext for this

  useEffect(() => {
    const setBreeders = async () => {
      const { data } = await axios.get(`${DEFAULT_URL}/breeds`, { headers: { Authorization: process.env.REACT_APP_API_KEY } });
      setAllBreeder(data.map((item: any) => item.name))
    };
    setBreeders().catch((error) => console.error(error));
  }, [])

  return (
    <SelectedBreedContext.Provider value={{ selectedBreed, setSelectedBreed }}>
    <AppStyle>
      <h1>Cat Browser</h1>
      <BreedSelect allBreeders={allBreeders} />

      <ImagesContainer>
        <SingleImageCard />
      </ImagesContainer>
    </AppStyle>
    </SelectedBreedContext.Provider>
  );
}

export default App;
