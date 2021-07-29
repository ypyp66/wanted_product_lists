import PageTitle from "components/Text/pageTitle";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
        }
    }

    render() {
        if (!this.state.products[this.state.id]) {
            return <div>Loading</div>;
        } else {
            const { title, brand, price } = this.state.products[this.state.id];
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
    margin: auto;
`;

const Title = styled.h2`
    overflow: hidden;
    font-weight: 600;
    text-overflow: ellipsis;
    font-size: 26px;
    line-height: 36px;
    height: 72px;
    max-height: 72px;

    :hover {
        color: darkblue;
    }
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
