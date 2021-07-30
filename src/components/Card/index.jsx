import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  ChanelIcon,
  GucciIcon,
  LouisVuittonIcon,
  NikeIcon,
  StoneIslandIcon,
} from 'res/svgIcons';

class Card extends Component {
  render() {
    const { cardId, title, brand, price } = this.props;
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
      >
        <CardContainer>
          <Title>{title}</Title>
          <Divider />
          <BottomContainer>
            <Brand>
              {brand === '나이키' ? (
                <NikeIcon />
              ) : brand === '구찌' ? (
                <GucciIcon />
              ) : brand === '루이비통' ? (
                <LouisVuittonIcon />
              ) : brand === '스톤아일랜드' ? (
                <StoneIslandIcon />
              ) : brand === '샤넬' ? (
                <ChanelIcon />
              ) : (
                <></>
              )}
              <h4>{brand}</h4>
            </Brand>
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

  :hover {
    color: darkblue;
  }
`;

const Brand = styled.div`
  display: flex;
  align-items: center;

  h4 {
    margin: 0;
    margin-left: 4px;
    font-size: 12px;
    color: #2d2d2d;
  }
`;

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
