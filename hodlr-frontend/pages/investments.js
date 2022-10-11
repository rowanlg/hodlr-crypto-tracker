import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import InvestmentTotal from "../components/InvestmentsPage/InvestmentTotal";
import BTCPrice from "../components/InvestmentsPage/BTCPrice";
import InvestmentList from "../components/InvestmentsPage/InvestmentList";
import LatestInvestments from "../components/InvestmentsPage/LatestInvestments";
import Buttons from "../components/InvestmentsPage/Buttons";

const InvestmentPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 0.3fr 1fr 1fr 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  gap: 30px 30px;
  padding: 30px;
  grid-template-areas:
    "investment-total liquidity btc-price latest-investments"
    "title buttons buttons latest-investments"
    "investments-show investments-show investments-show latest-investments"
    "investments-show investments-show investments-show latest-investments"
    "investments-show investments-show investments-show latest-investments"
    "investments-show investments-show investments-show latest-investments"
    "investments-show investments-show investments-show latest-investments";
  /* border: 1px solid green; */
  height: 100%;
  .title {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    h3 {
      margin: 0;
    }
  }
  .buttons {
    grid-column: span 2;
    text-align: right;
  }
`;

const investments = () => {
  const [buysData, setBuysData] = React.useState({});
  const [listOfCoins, setListOfCoins] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [listOfCoinPrices, setListOfCoinPrices] = React.useState({});

  React.useEffect(() => {
    fetch("http://localhost:8000/user/buys")
      .then((res) => res.json())
      .then((data) => {
        setBuysData(data);
      })
      .catch((err) => console.log(err));

    fetch("http://localhost:8000/user/prices")
      .then((res) => res.json())
      .then((data) => {
        setListOfCoinPrices(data);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    Object.entries(buysData).map((item) => {
      if (listOfCoins.length < Object.entries(buysData).length) {
        setListOfCoins((current) => [...current, item[1].name]);
      }
    });
  }, [buysData]);

  // React.useEffect(() => {
  //   const urlIds = () => {
  //     let urlString = "";
  //     if (listOfCoins.length > 1) {
  //       listOfCoins.map((coin, index) => {
  //         if (index == 0) {
  //           urlString += coin;
  //         } else {
  //           urlString += "%2C" + coin;
  //         }
  //       });
  //     } else {
  //       urlString = listOfCoins[0];
  //     }
  //     return urlString;
  //   };
  //   fetch(
  //     `https://api.coingecko.com/api/v3/simple/price?ids=${urlIds()}&vs_currencies=gbp`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setListOfCoinPrices(data);
  //     })
  //     .then(() => {
  //       setLoading(false);
  //     })
  //     .catch((err) => console.log(err));

  //   const timeout = setTimeout(() => {}, 5000);

  //   return () => clearTimeout(timeout);
  // }, [listOfCoins]);

  return (
    <Layout pageName="Investments">
      {loading ? null : (
        <InvestmentPage>
          <InvestmentTotal
            buysData={buysData}
            style={{ gridArea: "investment-total" }}
          />
          <InvestmentTotal
            buysData={buysData}
            style={{ gridArea: "liquidity" }}
          />
          <BTCPrice style={{ gridArea: "btc-price" }} />
          <LatestInvestments style={{ gridArea: "latest-investments" }} />
          <div className="title">
            <h3>Investments</h3>
          </div>
          <div className="buttons">
            <Buttons />
          </div>
          <InvestmentList
            buysData={buysData}
            loading={loading}
            listOfCoinPrices={listOfCoinPrices}
            style={{
              gridArea: "investments-show",
            }}
          />
        </InvestmentPage>
      )}
    </Layout>
  );
};

export default investments;
