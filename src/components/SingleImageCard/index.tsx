import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { DEFAULT_URL, ImageType } from '../../App';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelectedBreedContext } from '../../context/selectedBreedContext';

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

const SingleImageCard = () => {
  const { selectedBreed } = useSelectedBreedContext();
  const [allImages, setAllImages] = useState<ImageType[]>([])

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
    <>
      {allImages.map((image: ImageType) => (
        <ImageBox key={image.id}>
          <img src={image.url} />
          <ButtonStyle><Link to={'/' + image.id}>View Detail</Link></ButtonStyle>
        </ImageBox>
      ))}
    </>
  );
}

export default SingleImageCard;
