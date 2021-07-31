import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from 'components/Card/index.jsx';
import { getNotInterested } from 'services/localStorageWorker';
import ALERT_MESSAGE from 'constants/alertMessage';

const CardListContainer = styled.div`
  max-width: 1080px;
  padding: 32px 0;
  display: grid;
  // ANCHOR: 반응형처럼 만들어줌
  grid-template-columns: repeat(auto-fill, minmax(auto, 260px));
  grid-row-gap: 40px;
  justify-content: center;
`;

class CardList extends Component {
  notInterested = getNotInterested();
  handleClick = (e, cardId) => {
    if (!this.notInterested.includes(cardId)) return;
    e.preventDefault();
    alert(ALERT_MESSAGE.CANNOT_ENTER_NO_INTERESTED_PRODUCT);
    return;
  };
  render() {
    const { cards } = this.props;
    return (
      <CardListContainer>
        {cards.map(card => (
          <Card
            key={card.id}
            cardId={card.id}
            title={card.title}
            brand={card.brand}
            price={card.price}
            isNotInterested={this.notInterested.includes(card.id)}
            handleClick={this.handleClick}
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
