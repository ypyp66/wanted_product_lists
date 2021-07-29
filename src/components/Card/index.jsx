import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { setItemToRecentList } from "services/localStorageWorker";

class Card extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { cardId, title, brand, price } = this.props;
        setItemToRecentList({ id: cardId, title, brand, price });
    }

    render() {
        const { cardId, title, brand, price } = this.props;
        return (
            <StyledLink
                onClick={this.handleClick}
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
                    <Brand>{brand}</Brand>
                    <Price>
                        <strong>{price}</strong>원
                    </Price>
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
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 10px;
    h2,
    h3,
    h4 {
        margin-bottom: 8px;
    }
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
    /* -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; */
`;

const Brand = styled.h4`
    font-size: 12px;
    color: #2d2d2d;
`;

const Price = styled.h3`
    font-size: 14px;
    strong {
        font-weight: 600;
        font-size: 16px;
    }
`;

export default Card;
