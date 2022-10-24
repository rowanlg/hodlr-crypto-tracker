import React from "react";
import styled from "styled-components";
import colours from "../colours";

const InvestmentList = ({ buysData, loading, listOfCoinPrices }) => {
  const [dateSortReversed, setDateSortReversed] = React.useState(false);

  // List all buy transactions
  const listBuys = buysData
    .filter((obj) => obj.type == "buy")
    .map((item, index) => {
      function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.substring(1);
      }
      const localeOptions = {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      };
      let coinTotal = listOfCoinPrices[item.name.toLowerCase()]
        ? item.amount * listOfCoinPrices[item.name.toLowerCase()].gbp
        : 0;
      return (
        <tr key={index}>
          <td>{item.datetime.slice(0, 10)}</td>
          <td style={{ fontWeight: 500 }}>{capitalize(item.name)}</td>
          <td>{item.ticker.toUpperCase()}</td>
          <td>{item.amount}</td>
          <td style={{ color: colours.deactivatedWhite }}>
            {capitalize(item.location)}
          </td>

          <td style={{ color: colours.orange }}>
            £{item.price_bought_for.toLocaleString("en-GB", localeOptions)}
          </td>

          <td
            style={{
              color: coinTotal
                ? coinTotal > item.price_bought_for
                  ? colours.green
                  : colours.red
                : colours.orange,
            }}
          >
            {coinTotal
              ? "£" + coinTotal.toLocaleString("en-GB", localeOptions)
              : "N/A"}
          </td>
        </tr>
      );
    });
  return (
    <InvestmentListSection>
      <table>
        <thead>
          <tr>
            <th>
              Date{"  "}
              <svg
                width="14"
                height="8"
                viewBox="0 0 14 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                  setDateSortReversed(!dateSortReversed);
                }}
                style={{ transform: dateSortReversed ? "rotate(180deg)" : "" }}
              >
                <path
                  d="M1.5 1.5L7 7"
                  stroke="#717171"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12.5 1.5L7 6.99988"
                  stroke="#717171"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </th>
            <th>Name</th>
            <th>Ticker</th>
            <th>Amount</th>
            <th>Location</th>
            <th>Cost</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>{listBuys}</tbody>
      </table>
    </InvestmentListSection>
  );
};

export default InvestmentList;

const InvestmentListSection = styled.div`
  background-color: ${colours.mainBlue};
  border-radius: ${colours.borderRadius};
  padding: ${colours.padding};
  grid-row: span 5;
  grid-column: span 3;
  overflow-y: scroll;

  .line-break {
    width: 100%;
    height: 2px;
    border-radius: 1px;
    background-color: ${colours.deactivatedWhite};
  }
  table {
    border-collapse: collapse;
    width: 100%;
    tr {
      height: 50px;
    }
    tbody {
      tr {
        border-bottom: 1px solid ${colours.veryDeactivated};
        td {
          font-size: 0.8rem;
        }
      }
    }
    thead {
      border-bottom: 1px solid ${colours.veryDeactivated};
      tr {
        th {
          text-align: left;
          font-size: 0.9rem;
          svg {
            margin-left: 3px;
            /* margin-bottom: 1px; */
            cursor: pointer;
            width: 11px;
          }
        }
      }
    }
  }
`;
