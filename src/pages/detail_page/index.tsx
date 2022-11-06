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
  width: 80%;
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`

const BackButton = styled.button`
  border: none;
  background: yellow;
  padding: 8px;
  width: 64px;
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

  if (!imgInfo) return <p>Loading</p>

  return (
    <Wrapper>
      <DetailContainer>
        <BackButton onClick={() => { document.location.href = "/" }}>Back</BackButton>
        <img src={imgInfo.url} />
        <div>
          <h2>{imgInfo.name}</h2>
          <h3>Origin: {imgInfo.origin}</h3>
          <strong><p>{imgInfo.temperament}</p></strong>
          <p>{imgInfo.description}</p>
        </div>
      </DetailContainer>
    </Wrapper>
  );
}

export default DetailPage;
