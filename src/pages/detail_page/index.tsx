import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { DEFAULT_URL } from '../../App';

type DetailType = {
  origin: string,
  description: string,
  name: string,
  temperament: string,
  url: string,
}

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border: 1px solid #c1c1c1;
  border-radius: 4px;
  padding: 16px 0;
`

const BackButton = styled.button`
  border: none;
  background: #007bff;
  padding: 8px;
  width: 64px;
  border-radius: 4px;
  color: white;
  height: 40px;
  margin-left: 16px;
`

const InfoContainer = styled.div`
  margin-left: 16px;
`

function DetailPage() {
  const { id } = useParams();
  const [imgInfo, setImgInfo] = useState<DetailType>()

  useEffect(() => {
    const setBreeders = async () => {
      const { data } = await axios.get(`${DEFAULT_URL}/images/${id}`, { headers: { Authorization: process.env.REACT_APP_API_KEY } });
      const { origin, description, name, temperament } = data.breeds[0];
      const { url } = data;
      const formatedData = { origin, description, name, temperament, url }
      setImgInfo(formatedData)
    };
    setBreeders().catch((error) => console.error(error));
  })

  if (!imgInfo) return <h3>Loading...</h3>

  return (
    <DetailContainer>
      <BackButton onClick={() => { document.location.href = "/" }}>Back</BackButton>
      <img src={imgInfo.url} />
      <InfoContainer >
        <h2>{imgInfo.name}</h2>
        <h3>Origin: {imgInfo.origin}</h3>
        <strong><p>{imgInfo.temperament}</p></strong>
        <p>{imgInfo.description}</p>
      </InfoContainer>
    </DetailContainer>
  );
}

export default DetailPage;
