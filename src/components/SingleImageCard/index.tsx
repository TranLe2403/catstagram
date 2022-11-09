import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DEFAULT_URL } from '../../App';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelectedBreedContext } from '../../context/selectedBreedContext';
import CustomButton from '../CustomButton';
import { ImageType } from '../../types';

const CardItemStyle = styled.div`
  padding: 0 16px;

  @media (min-width: 768px) {
    width: calc(25% - 32px);
  }

  @media (max-width: 767px) {
    width: calc(33% - 32px);
  }

  @media (max-width: 575px) {
    width: calc(50% - 32px);
  }
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #c1c1c1;
  height: fit-content;
  border-radius: 4px;
  overflow: hidden;
`;

const WhiteTextLink = styled(Link)`
  color: white;
  text-decoration: none;
  line-height: 1.5;
`;

type PropsType = {
  setIsInvisible: React.Dispatch<React.SetStateAction<boolean>>;
  page: number;
  allImages: ImageType[];
  setAllImages: React.Dispatch<React.SetStateAction<ImageType[]>>;
};

const SingleImageCard = ({ setIsInvisible, page, allImages, setAllImages }: PropsType) => {
  const { selectedBreed } = useSelectedBreedContext();

  useEffect(() => {
    const findBreed = async () => {
      if (selectedBreed[0] === 'select_breed') return;
      const { data, headers } = await axios.get<ImageType[]>(`${DEFAULT_URL}/images/search`, {
        headers: { 'x-api-key': process.env.REACT_APP_API_KEY },
        params: { breed_ids: selectedBreed[0], limit: 5, page, order: 'desc' }
      });
      const formatedData = data.map(({ url, id }) => ({ url, id }));
      const newBreedSet = allImages.concat(formatedData);
      setIsInvisible(Number(headers['pagination-count']) <= newBreedSet.length);
      setAllImages(newBreedSet);
    };
    findBreed().catch(() =>
      alert('Apologies but we could not load new cats for you at this time! Miau!')
    );
  }, [selectedBreed, page]);

  const handleClick = (id: string) => (document.location.href = '/' + id);

  return (
    <>
      {allImages.map(({ id, url }: ImageType) => (
        <CardItemStyle key={id}>
          <ImageBox>
            <img src={url} alt={url} />
            <CustomButton
              onClick={() => handleClick(id)}
              bgColor="#007bff"
              margin="16px 16px 16px 16px"
              fullWidth
            >
              <WhiteTextLink to={'/' + id}>View Detail</WhiteTextLink>
            </CustomButton>
          </ImageBox>
        </CardItemStyle>
      ))}
    </>
  );
};

export default SingleImageCard;
