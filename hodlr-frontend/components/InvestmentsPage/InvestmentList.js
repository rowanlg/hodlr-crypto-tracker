import React from "react";
import styled from "styled-components";
import colours from "../colours";

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
            margin-left: 5px;
            margin-bottom: 1px;
            cursor: pointer;
          }
        }
      }
    }
  }
`;

const InvestmentList = ({ buysData, loading, listOfCoinPrices }) => {
  const [dateSortReversed, setDateSortReversed] = React.useState(false);

  const listBuys = Object.entries(buysData).map((buy, index) => {
    const localeOptions = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };
    const price_bought_for = buy[1].price_bought_for * buy[1].amount;
    const price_current =
      listOfCoinPrices[buy[1].name.toLowerCase()]?.gbp * buy[1].amount;
    return (
      <tr key={index}>
        <td>{buy[1].datetime.slice(0, 10)}</td>
        <td style={{ fontWeight: 500 }}>{buy[1].name}</td>
        <td>{buy[1].ticker}</td>
        <td>{buy[1].amount}</td>
        <td>{buy[1].location}</td>
        <td style={{ color: colours.orange }}>
          £{price_bought_for.toLocaleString("en-GB", localeOptions)}
        </td>
        <td
          style={{
            color:
              price_bought_for > price_current ? colours.red : colours.green,
          }}
        >
          £{price_current.toLocaleString("en-GB", localeOptions)}
        </td>
      </tr>
    );
  });
  // console.log(buysData);
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
