import styled, { css } from 'styled-components';
import Button from 'components/Button';

export const ProductContainer = styled.div`
  max-width: 1080px;
  min-height: 100vh - 24px;
  margin: auto;
`;
export const HeaderContainer = styled.div`
  margin-left: 24px;
  margin-top: 24px;
`;
export const ItemContainer = styled.div`
  width: 50%;
  padding: 5%;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  border-radius: 5%;
  h2,
  h3,
  h4 {
    margin-bottom: 5%;
  }
  margin: 5% auto;
`;
export const Title = styled.h2`
  overflow: hidden;
  font-weight: 600;
  text-overflow: ellipsis;
  font-size: 26px;
  line-height: 36px;
  height: 72px;
  max-height: 72px;
  /* -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; */
`;
export const Brand = styled.h4`
  font-size: 16px;
  color: #2d2d2d;
`;
export const Price = styled.h3`
  font-size: 18px;
  strong {
    font-weight: 600;
    font-size: 20px;
  }
`;
export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
export const RandomProductButton = styled(Button)`
  padding: 0 20px;
  margin-top: 24px;
`;
export const NotInterestedButton = styled(Button)`
  padding: 0 20px;
  margin-top: 24px;

  ${props =>
    props.isnotinterested &&
    css`
      border: 1px solid #61696c;
      background-color: white;
      color: #61696c;
      cursor: default;
    `};
`;
