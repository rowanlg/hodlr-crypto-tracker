import React from "react";
import styled from "styled-components";
import colours from "../colours";

const LatestTransactions = ({ buysData }) => {
  // List all newest transactions
  const listOfTransactions = buysData
    .sort((a, b) => {
      return b.datetime < a.datetime ? -1 : b.datetime > a.datetime ? 1 : 0;
    })
    .map((item, index) => {
      function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.substring(1);
      }
      const localeOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };
      return (
        <div key={index}>
          <div className="transaction">
            <div className="logo">
              <div className="placeholder">
                <p className="logo-text">{item.ticker}</p>
              </div>
            </div>
            <div className="amount-location">
              <p className="amount">
                {item.amount} {item.ticker}
              </p>
              <p className="location">{capitalize(item.location)}</p>
            </div>
            <div className="price-type">
              <p
                className="price"
                style={{
                  color: item.type == "buy" ? colours.green : colours.red,
                }}
              >
                ${item.price_bought_for.toLocaleString("en-GB", localeOptions)}
              </p>
              <p className="type">{item.type == "buy" ? "Bought" : "Sold"}</p>
            </div>
          </div>
          <div className="line-break" />
        </div>
      );
    });
  return (
    <LatestTransactionsSection>
      <h4>Latest Transactions</h4>
      {listOfTransactions}
    </LatestTransactionsSection>
  );
};

export default LatestTransactions;

const LatestTransactionsSection = styled.div`
  grid-row: span 7;
  background-color: ${colours.mainBlue};
  padding: ${colours.padding};
  border-radius: ${colours.borderRadius};
  overflow-y: scroll;
  h4 {
    margin: 5px 0 15px 0;
    font-weight: 500;
  }
  .line-break {
    border-bottom: 1px solid ${colours.veryDeactivated};
    width: 95%;
    height: 0px;
    margin: 10px auto;
  }
  .transaction {
    display: grid;
    grid-template-columns: auto 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    gap: 0px 0px;
    grid-template-areas: "Logo amount-location price-type price-type";
    p {
      margin: 0;
    }
    .logo {
      margin-right: 8px;
      .placeholder {
        margin: auto 0;
        border-radius: ${colours.borderRadius};
        max-width: 40px;
        max-height: 40px;
        height: 3vw;
        width: 3vw;
        background-color: ${colours.darkBlue};
        display: flex;
        justify-content: center;
        align-items: center;
        p.logo-text {
          font-size: 0.6rem;
          margin: 0;
        }
      }
    }
    .amount-location {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      p.amount,
      p.location {
        font-size: 0.6rem;
      }
      p.location {
        color: ${colours.deactivatedWhite};
      }
    }
    .price-type {
      grid-column: span 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      p.type {
        color: ${colours.deactivatedWhite};
        font-size: 0.6rem;
      }
      p.price {
        font-size: 0.7rem;
      }
    }
  }
`;
