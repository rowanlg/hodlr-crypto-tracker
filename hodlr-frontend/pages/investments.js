import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import InvestmentTotal from "../components/InvestmentsPage/InvestmentTotal";
import BTCPrice from "../components/InvestmentsPage/BTCPrice";
import ETHPrice from "../components/InvestmentsPage/ETHPrice";
import InvestmentList from "../components/InvestmentsPage/InvestmentList";
import LatestTransactions from "../components/InvestmentsPage/LatestTransactions";
import Buttons from "../components/InvestmentsPage/Buttons";
import Modal from "../components/InvestmentsPage/Modal";
import { UserContext } from "../context/UserContext";

const InvestmentPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 0.3fr 1fr 1fr 1fr 1fr 1fr;
  grid-auto-rows: 1fr;
  gap: 30px 30px;
  padding: 30px;
  grid-template-areas:
    "investment-total btc-price eth-price latest-investments"
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

const InvestmentsPage = () => {
  const [buysData, setBuysData] = React.useState({});
  const [listOfCoins, setListOfCoins] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [listOfCoinPrices, setListOfCoinPrices] = React.useState([]);
  const [addModalShow, setAddModalShow] = React.useState(false);
  const [editModalShow, setEditModalShow] = React.useState(false);
  const [deleteModalShow, setDeleteModalShow] = React.useState(false);
  const [token] = React.useContext(UserContext);

  // const updateCoinPrices = () => {
  //   Object.values(buysData).map((item) => {
  //     setListOfCoins((current) => [...current, item.name]);
  //   });
  // };

  React.useEffect(() => {
    const investmentsOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    fetch(process.env.SERVER_URL + "/api/investments", investmentsOptions)
      .then((res) => res.json())
      .then((data) => {
        setBuysData(data);
        // console.log(data);
      })
      .catch((err) => console.log(err));

    const coinsOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    fetch(process.env.SERVER_URL + "/api/coins_held", coinsOptions)
      .then((res) => res.json())
      .then((data) => {
        setListOfCoins(data);
        // console.log(data);
      })
      .catch((err) => console.log(err));

    fetch(process.env.SERVER_URL + "/api/prices", coinsOptions)
      .then((res) => res.json())
      .then((data) => {
        setListOfCoinPrices(data);
        // console.log(data);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout pageName="Investments">
      {loading ? null : (
        <InvestmentPage>
          <InvestmentTotal
            listOfCoins={listOfCoins}
            listOfCoinPrices={listOfCoinPrices}
            buysData={buysData}
            style={{ gridArea: "investment-total" }}
          />
          <BTCPrice style={{ gridArea: "btc-price" }} />
          <ETHPrice style={{ gridArea: "eth-price" }} />

          <LatestTransactions
            buysData={buysData}
            style={{ gridArea: "latest-investments" }}
          />

          <div className="title">
            <h3>Investments</h3>
          </div>
          <div className="buttons">
            <Buttons
              addModalShow={addModalShow}
              setAddModalShow={setAddModalShow}
              editModalShow={editModalShow}
              setEditModalShow={setEditModalShow}
              deleteModalShow={deleteModalShow}
              setDeleteModalShow={setDeleteModalShow}
            />
          </div>

          <InvestmentList
            buysData={buysData}
            loading={loading}
            listOfCoinPrices={listOfCoinPrices}
            style={{
              gridArea: "investments-show",
            }}
          />

          {addModalShow || editModalShow || deleteModalShow ? (
            <Modal
              addModalShow={addModalShow}
              setAddModalShow={setAddModalShow}
              editModalShow={editModalShow}
              setEditModalShow={setEditModalShow}
              deleteModalShow={deleteModalShow}
              setDeleteModalShow={setDeleteModalShow}
              listOfCoins={listOfCoins}
              buysData={buysData}
            />
          ) : null}
        </InvestmentPage>
      )}
    </Layout>
  );
};

export default InvestmentsPage;
