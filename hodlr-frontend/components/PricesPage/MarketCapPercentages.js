import React from "react";
import styled from "styled-components";
import colours from "../colours";

const MarketCapPercentages = () => {
  const [marketCapPercentages, setMarketPercentages] = React.useState([]);

  // Fetch market cap percentages of whole market
  React.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/global", {
      "Content-Type": "application/json",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMarketPercentages(data.data.market_cap_percentage);
      })
      .catch((err) => console.log(err));
  }, []);

  // List market cap percentages in table
  const listMarketCaps = Object.entries(marketCapPercentages).map(
    (item, index) => {
      return (
        <tr
          key={index}
          style={{
            borderBottom:
              index !== Object.entries(marketCapPercentages).length - 1
                ? `1px solid ${colours.veryDeactivated}`
                : "",
          }}
        >
          <td>{index + 1}</td>
          <td>{item[0].toUpperCase()}</td>
          <td style={{ textAlign: "right" }}>{item[1].toFixed(2)}</td>
        </tr>
      );
    }
  );

  return (
    <MarketCaps>
      <h4>Market Caps</h4>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th style={{ textAlign: "right" }}>%</th>
          </tr>
        </thead>
        <tbody>{listMarketCaps}</tbody>
      </table>
    </MarketCaps>
  );
};

export default MarketCapPercentages;

const MarketCaps = styled.div`
  width: 100%;
  height: 100%;
  padding: 15px;
  h4 {
    margin-bottom: 35px;
  }
  table {
    width: 90%;
    margin: auto;
    border-collapse: collapse;
    background-color: ${colours.darkBlue};
    border-radius: 3px;
    border-style: hidden;
    box-shadow: 0 0 0 14px ${colours.darkBlue};
    thead {
      border-bottom: 1px solid ${colours.veryDeactivated};
      tr {
        text-align: left;
        font-size: 0.8rem;
      }
    }
    tbody {
      td {
        text-align: left;
        padding: 4px 0;
        font-size: 0.8rem;
      }
    }
  }
`;
