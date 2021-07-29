const { default: styled } = require('styled-components');

const Button = styled.button`
  width: 50px;
  height: 30px;
  background-color: #ef9a9a;
  border-radius: 15px;
  border: none;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  cursor: pointer;
`;

export default Button;
