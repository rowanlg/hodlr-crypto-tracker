import React from "react";
import styled from "styled-components";
import colours from "../colours";

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
    /* padding: 15px; */
    border-radius: 3px;
    border-style: hidden; /* hide standard table (collapsed) border */
    box-shadow: 0 0 0 14px ${colours.darkBlue}; /* this draws the table border  */
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

const MarketCapPercentages = () => {
  const [marketCapPercentages, setMarketPercentages] = React.useState([]);
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

  console.log("%", marketCapPercentages);
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
