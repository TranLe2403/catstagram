import styled from 'styled-components'

const ButtonStyle = styled.button<{ bgColor: string, margin: string, fullWidth: boolean }>`
  height: 40px;
  background: ${({ bgColor }) => bgColor};
  border: none;
  padding: 0 16px;
  width: ${({ fullWidth }) => fullWidth ? 'unset' : 'fit-content'};
  margin: ${({ margin }) => margin};;
  color: white;
  border-radius: 4px;
  cursor: pointer;
`

type PropsType = {
  bgColor: string,
  margin: string,
  onClick?: () => void,
  children: any,
  fullWidth?: boolean,
}

function CustomButton({ bgColor, margin, onClick, children, fullWidth }: PropsType) {
  return (
    <ButtonStyle
      fullWidth={!!fullWidth}
      bgColor={bgColor}
      margin={margin}
      onClick={onClick}
    >
      {children}
    </ButtonStyle>
  );
}

export default CustomButton;
