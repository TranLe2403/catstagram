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

const ImagesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: fit-content;
  margin-left: 16px;
`

export const DEFAULT_URL = 'https://api.thecatapi.com/v1';

function App() {
  const [allBreeders, setAllBreeder] = useState<string[]>([])
  const [selectedBreed, setSelectedBreed] = useState<string>('Select Breed')

  useEffect(() => {
    const setBreeders = async () => {
      const { data } = await axios.get(`${DEFAULT_URL}/breeds`, { headers: { Authorization: process.env.REACT_APP_API_KEY } });
      setAllBreeder(data.map((item: any) => item.name))
    };
    setBreeders().catch((error) => console.error(error));
  }, [])

  return (
    <SelectedBreedContext.Provider value={{ selectedBreed, setSelectedBreed }}>
      <HeaderContainer>
        <h1>Cat Browser</h1>
        <BreedSelect allBreeders={allBreeders} />
      </HeaderContainer>

      <ImagesContainer>
        <SingleImageCard />
      </ImagesContainer>
    </SelectedBreedContext.Provider>
  );
}

export default App;
