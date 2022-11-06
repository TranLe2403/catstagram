import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { ImageType } from '../../App';

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

const SingleImageCard = ({ image }: { image: ImageType }) => (
  <ImageBox key={image.id}>
    <img src={image.url} />
    <ButtonStyle><Link to={'/' + image.id}>View Detail</Link></ButtonStyle>
  </ImageBox>
);

export default SingleImageCard;
