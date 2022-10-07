import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import InvestmentTotal from "../components/InvestmentTotal";

const InvestmentPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 0.3fr 1fr 1fr 1fr 1fr 1fr;
  gap: 30px 30px;
  padding: 30px;
  grid-template-areas:
    "investment-total liquidity btc-price latest-investments"
    "title . buttons latest-investments"
    "investments-show investments-show investments-show latest-investments"
    "investments-show investments-show investments-show latest-investments"
    "investments-show investments-show investments-show latest-investments"
    "investments-show investments-show investments-show latest-investments"
    "investments-show investments-show investments-show latest-investments";
  /* border: 1px solid green; */
  height: 100%;
`;

const investments = () => {
  return (
    <Layout pageName="Investments">
      <InvestmentPage>
        <InvestmentTotal style={{ gridArea: "investment-total" }} />
        <InvestmentTotal style={{ gridArea: "liquidity" }} />
        <InvestmentTotal style={{ gridArea: "btc-price" }} />
        <InvestmentTotal style={{ gridArea: "latest-investments" }} />
      </InvestmentPage>
    </Layout>
  );
};

export default investments;
