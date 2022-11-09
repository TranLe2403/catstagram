import { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import SingleImageCard from './components/SingleImageCard';
import BreedSelect from './components/BreedSelect';
import { SelectedBreedContext } from './context/selectedBreedContext';
import CustomButton from './components/CustomButton';
import { BreedType, ImageType } from './types';

const ImagesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: fit-content;
  margin-left: 16px;
`;

export const DEFAULT_URL = 'https://api.thecatapi.com/v1';

function App() {
  const [allBreeds, setAllBreeds] = useState<BreedType[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<BreedType>(['selected_breed', 'Select Breed']);
  const [isInvisible, setIsInvisible] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [allImages, setAllImages] = useState<ImageType[]>([]);

  useEffect(() => {
    const setBreeders = async () => {
      const { data } = await axios.get<{ id: string; name: string }[]>(`${DEFAULT_URL}/breeds`, {
        headers: { 'x-api-key': process.env.REACT_APP_API_KEY }
      });
      const breedArray = data.map(({ id, name }) => [id, name]) as BreedType[];
      const breedNameObj = Object.fromEntries(breedArray);
      if (window.location.href.includes('?breed=')) {
        const breed_id = window.location.href.split('?breed=')[1];
        setSelectedBreed([breed_id, breedNameObj[breed_id]]);
      }
      setAllBreeds(breedArray);
    };
    setBreeders().catch(() =>
      alert('Apologies but we could not load new cats for you at this time! Miau!')
    );
  }, []);

  const handleClick = () => setPage(page + 1);

  return (
    <SelectedBreedContext.Provider value={{ selectedBreed, setSelectedBreed }}>
      <HeaderContainer>
        <h1>Cat Browser</h1>
        <BreedSelect allBreeds={allBreeds} setPage={setPage} setAllImages={setAllImages} />
      </HeaderContainer>

      <ImagesContainer>
        <SingleImageCard
          allImages={allImages}
          setAllImages={setAllImages}
          setIsInvisible={setIsInvisible}
          page={page}
        />
      </ImagesContainer>
      {isInvisible ? null : (
        <CustomButton onClick={handleClick} bgColor="#28a745" margin="0 0 0 16px">
          Load More
        </CustomButton>
      )}
    </SelectedBreedContext.Provider>
  );
}

export default App;
