import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { DEFAULT_URL } from '../../App';
import CustomButton from '../../components/CustomButton';

type BreedInfoType = {
  origin: string;
  description: string;
  name: string;
  temperament: string;
  id: string;
};

type DetailType = BreedInfoType & { url: string };

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #c1c1c1;
  border-radius: 4px;
  padding: 16px 0;
`;

const InfoContainer = styled.div`
  margin-left: 16px;
`;

function DetailPage() {
  const { id } = useParams();
  const [imgInfo, setImgInfo] = useState<DetailType>();

  useEffect(() => {
    const setBreeds = async () => {
      const { data } = await axios.get(`${DEFAULT_URL}/images/${id}`, {
        headers: { 'x-api-key': process.env.REACT_APP_API_KEY }
      });
      const { origin, description, name, temperament, id: breed_id } = data.breeds[0];
      const { url } = data;
      const formatedData = { origin, description, name, temperament, url, id: breed_id };
      setImgInfo(formatedData);
    };
    setBreeds().catch(() =>
      alert('Apologies but we could not load new cats for you at this time! Miau!')
    );
  });

  const handleClick = () => (document.location.href = `/?breed=${imgInfo?.id}`);

  if (!imgInfo) return <h3>Loading...</h3>;
  return (
    <DetailContainer>
      <CustomButton bgColor="#007bff" margin="0 0 0 16px" onClick={handleClick}>
        Back
      </CustomButton>
      <img src={imgInfo.url} alt={imgInfo.name} />
      <InfoContainer>
        <h2>{imgInfo.name}</h2>
        <h3>Origin: {imgInfo.origin}</h3>
        <strong>
          <p>{imgInfo.temperament}</p>
        </strong>
        <p>{imgInfo.description}</p>
      </InfoContainer>
    </DetailContainer>
  );
}

export default DetailPage;
