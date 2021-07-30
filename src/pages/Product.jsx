import Button from "components/Button";
import PageTitle from "components/Text/pageTitle";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
    setItemToNotInterested,
    setItemToRecentList,
} from "services/localStorageWorker";
import styled from "styled-components";
import { getJsonData } from "utils/getJsonData";

class Product extends Component {
    state = {
        products: [],
        id: null,
    };

    async componentDidMount() {
        const products = await getJsonData();
        const { id } = this.props.match.params;
        setItemToRecentList(products[id]);
        this.setState({
            products,
            id,
        });
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params !== prevProps.match.params) {
            const { id } = this.props.match.params;
            this.setState({
                id,
            });
            setItemToRecentList(this.state.products[id]);
        }
    }
    getRandomInt = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
    };

    checkRandomProduct = () => {
        let randomId = this.state.id;
        while (randomId === this.state.id) {
            randomId = this.getRandomInt(0, 100);
        }
        this.props.history.push(`/product/${randomId}`);
    };

    render() {
        if (!this.state.products[this.state.id]) {
            return <div>Loading</div>;
        } else {
            const { id } = this.state;
            const { title, brand, price } = this.state.products[id];
            return (
                <ProductContainer>
                    <HeaderContainer>
                        <PageTitle title="상품 상세 페이지" />
                    </HeaderContainer>
                    <ItemContainer>
                        <Title>{title}</Title>
                        <Brand>{brand}</Brand>
                        <Price>
                            <strong>{price}</strong>원
                        </Price>
                        <ButtonContainer>
                            <RandomProductButton
                                onClick={this.checkRandomProduct}
                            >
                                랜덤 상품 조회
                            </RandomProductButton>
                            <NotInterestedButton
                                onClick={() =>
                                    setItemToNotInterested(parseInt(id))
                                }
                            >
                                관심 없음
                            </NotInterestedButton>
                        </ButtonContainer>
                    </ItemContainer>
                </ProductContainer>
            );
        }
    }
}

Product.propTypes = {};

// NOTE: withRouter 를 써야하는이유는?
export default withRouter(Product);

const ProductContainer = styled.div`
    max-width: 1080px;
    min-height: 100vh - 24px;
    margin: auto;
`;

const HeaderContainer = styled.div`
    margin-left: 24px;
    margin-top: 24px;
`;

const ItemContainer = styled.div`
    width: 50%;
    padding: 5%;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    border-radius: 5%;
    h2,
    h3,
    h4 {
        margin-bottom: 5%;
    }
    margin: 5% auto;
`;

const Title = styled.h2`
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

const Brand = styled.h4`
    font-size: 16px;
    color: #2d2d2d;
`;

const Price = styled.h3`
    font-size: 18px;
    strong {
        font-weight: 600;
        font-size: 20px;
    }
`;
const ButtonContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;
const RandomProductButton = styled(Button)`
    width: 100px;
    background-color: pink;
    margin-top: 24px;
`;
const NotInterestedButton = styled(Button)`
    width: 100px;
    background-color: pink;
    margin-top: 24px;
`;
