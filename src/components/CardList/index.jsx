import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from 'components/Card/index.jsx';

const CardListContainer = styled.div`
  width: 1080px;
  padding-top: 32px;
  margin: auto;

  display: grid;
  // ANCHOR: fr의 의미는 무엇인가?
  grid-template-columns: repeat(4, 1fr);
  grid-row-gap: 20px;
  justify-content: center;
`;

class CardList extends Component {
  render() {
    const { cards } = this.props;
    return (
      <CardListContainer className='cardlist'>
        {cards.map((card) => (
          <Card
            id={card.id}
            title={card.title}
            brand={card.brand}
            price={card.price}
          />
        ))}
      </CardListContainer>
    );
  }
}

CardList.propTypes = {
  cards: PropTypes.array,
};

export default CardList;
