import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { DEFAULT_URL } from '../../App';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelectedBreedContext } from '../../context/selectedBreedContext';
import CustomButton from '../CustomButton';
import { ImageType } from '../../types';

const CardItemStyle = styled.div`
  padding: 0 16px;

  @media ( min-width: 768px) {
    width: calc(25% - 32px);
  }

  @media (max-width: 767px) {
    width: calc(33% - 32px);
  }

  @media (max-width: 575px) {
    width: calc(50% - 32px);
  }
`

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #c1c1c1;
  height: fit-content;
  border-radius: 4px;
  overflow: hidden;
`

const WhiteTextLink = styled(Link)`
  color: white;
  text-decoration: none;
  line-height: 1.5;
`

const SingleImageCard = () => {
  const { selectedBreed } = useSelectedBreedContext();
  const [allImages, setAllImages] = useState<ImageType[]>([])

  useEffect(() => {
    const findBreed = async () => {
      if (selectedBreed[0] === 'select_breed') return;
      const { data } = await axios.get(
        `${DEFAULT_URL}/images/search`,
        { params: { breed_ids: selectedBreed[0], limit: 20 } }
      );
      setAllImages(data.map(({ url, id }: ImageType) => ({ url, id })));
    };
    findBreed().catch((error) => console.error(error));
  }, [selectedBreed])

  const handleClick = (id: string) => document.location.href = '/' + id;

  return (
    <>
      {allImages.map(({ id, url }: ImageType) => (
        <CardItemStyle key={id}>
          <ImageBox>
            <img src={url} />
            <CustomButton onClick={() => handleClick(id)} bgColor='#007bff' margin='16px 16px 16px 16px' fullWidth>
              <WhiteTextLink to={'/' + id}>View Detail</WhiteTextLink>
            </CustomButton>
          </ImageBox>
        </CardItemStyle>
      ))}
    </>
  );
}

export default SingleImageCard;
