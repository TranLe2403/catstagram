import styled from 'styled-components';

const ButtonStyle = styled.button<{
  bgColor: string;
  margin: string;
  fullWidth: boolean;
  disabled: boolean;
}>`
  height: 40px;
  opacity: ${({ disabled }) => (disabled ? '0.65' : '1')};
  background: ${({ bgColor }) => bgColor};
  border: none;
  padding: 0 16px;
  width: ${({ fullWidth }) => (fullWidth ? 'unset' : 'fit-content')};
  margin: ${({ margin }) => margin};
  color: white;
  border-radius: 4px;
  cursor: pointer;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
`;

type PropsType = {
  bgColor: string;
  margin: string;
  onClick?: () => void;
  children: any;
  fullWidth?: boolean;
  disabled?: boolean;
};

function CustomButton(props: PropsType) {
  const { bgColor, margin, onClick, children, fullWidth, disabled } = props;
  return (
    <ButtonStyle
      disabled={!!disabled}
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
