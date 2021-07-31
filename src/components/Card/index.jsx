import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Brand from 'components/Brand/index.jsx';

class Card extends Component {
  render() {
    const { cardId, title, brand, price, isNotInterested, handleClick } =
      this.props;
    return (
      <StyledLink
        to={{
          pathname: `/product/${cardId}`,
          state: {
            id: cardId,
            title: title,
            brand: brand,
            price: price,
          },
        }}
        onClick={e => handleClick(e, cardId)}
      >
        <CardContainer isnotinterested={isNotInterested}>
          <Title>{title}</Title>
          <Divider />
          <BottomContainer>
            <Brand brand={brand} />
            <Price>
              <strong>{price.toLocaleString()}</strong>원
            </Price>
          </BottomContainer>
        </CardContainer>
      </StyledLink>
    );
  }
}

Card.propTypes = {
  cardId: PropTypes.number,
  title: PropTypes.string,
  brand: PropTypes.string,
  price: PropTypes.number,
};

const StyledLink = styled(Link)`
  color: black;
  width: 220px;
  justify-self: center;
`;

const CardContainer = styled.div`
  display: inline-block;
  width: 220px;
  padding: 15px;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 10px;
  h2,
  h3,
  h4 {
    margin-bottom: 8px;
  }

  ${props =>
    props.isnotinterested
      ? css`
          box-shadow: none;
          h2,
          h3,
          h4 {
            color: #61696c;
          }
          cursor: not-allowed;
        `
      : css`
          :hover {
            background-color: #f7f7f7;
          }
        `}
`;

const Divider = styled.div`
  width: 100%;
  border-top: 0.5px solid rgba(0, 0, 0, 0.06);
  margin: 12px 0;
`;

const BottomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  overflow: hidden;
  font-weight: 600;
  text-overflow: ellipsis;
  line-height: 18px;
  height: 36px;
  max-height: 36px;
`;

// const Brand = styled.div`
//   display: flex;
//   align-items: center;

//   h4 {
//     margin: 0;
//     margin-left: 4px;
//     font-size: 12px;
//     color: #2d2d2d;
//   }
// `;

const Price = styled.h3`
  color: #3e72fb;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 0 !important;
  strong {
    font-size: 16px;
  }
`;

export default Card;
