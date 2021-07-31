import styled from 'styled-components';

export const ModalDeemed = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  background-color: rgba(200, 200, 200, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;
