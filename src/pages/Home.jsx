import React, { Component } from "react";
import styled from "styled-components";
import CardList from "components/CardList/index";
import PageTitle from "components/Text/pageTitle";
import Button from "../components/Button/index";
import LinkButton from "../components/LinkButton/index";

const HomeContainer = styled.div`
  max-width: 1080px;
  margin: auto;
`;

const HeaderContainer = styled.div`
  margin-left: 24px;
  margin-top: 24px;
`;

const RandomProductButton = styled(Button)`
  width: 100px;
  background-color: pink;
  margin-top: 24px;
`;

class Home extends Component {
  state = {
    products: [],
  };

  async componentDidMount() {
    const response = await fetch("http://localhost:3000/data/productList.json");
    const products = await response.json();
    // TODO: not-intertest 는 필터링한 다음에 set을 해줘야할까?
    // TODO: 어떻게 커스터마이징
    this.setState({
      products,
    });
  }

  render() {
    return (
      <HomeContainer>
        <HeaderContainer>
          <PageTitle title="상품 목록" />
          <RandomProductButton
            onClick={() => console.log("랜덤상품조회 클릭!")}
          >
            랜덤 상품 조회
          </RandomProductButton>
        </HeaderContainer>

        <CardList cards={this.state.products} />
        <LinkButton title="조회 이력" to="/recentList" />
      </HomeContainer>
    );
  }
}

Home.propTypes = {};

export default Home;
