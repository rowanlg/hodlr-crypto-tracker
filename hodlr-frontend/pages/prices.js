import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import colours from "../components/colours";
import Trending from "../components/PricesPage/Trending";
import MarketCapPercentages from "../components/PricesPage/MarketCapPercentages";

const PricesContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  gap: 30px 30px;
  grid-template-areas:
    "trending trending trending coins-held-prices"
    "trending trending trending coins-held-prices"
    ". . . ."
    ". . . .";
  padding: 30px;
  .trending {
    grid-area: trending;
    /* grid-row: span 4; */
    grid-column: span 3;
    background-color: ${colours.mainBlue};
    border-radius: ${colours.borderRadius};
    padding: 15px;
  }
  .coins-held-prices {
    grid-area: coins-held-prices;
    /* grid-row: span 4; */
    background-color: ${colours.mainBlue};
    border-radius: ${colours.borderRadius};
  }
`;

const PricesPage = () => {
  return (
    <Layout pageName="Prices">
      <PricesContainer>
        <div className="trending">
          <Trending />
        </div>
        <div className="coins-held-prices">
          <MarketCapPercentages />
        </div>
      </PricesContainer>
    </Layout>
  );
};

export default PricesPage;
