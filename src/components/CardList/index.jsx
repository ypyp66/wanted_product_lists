import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from 'components/Card/index.jsx';

const CardListContainer = styled.div`
  max-width: 1080px;
  padding-top: 32px;
  margin: auto;

  display: grid;
  // ANCHOR: 반응형처럼 만들어줌
  grid-template-columns: repeat(auto-fill, minmax(auto, 260px));
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
            key={card.id}
            cardId={card.id}
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
