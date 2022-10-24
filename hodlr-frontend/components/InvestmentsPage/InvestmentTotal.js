import React from "react";
import SmallWidget from "../SmallWidget";

const InvestmentTotal = ({ listOfCoins, listOfCoinPrices, buysData }) => {
  const getBuysTotal = () => {
    let counter = 0;
    let percentageIncrease = [];
    let previousTotal = 0;

    // Get total investment amount and percentage change for each coin
    listOfCoins.map((item) => {
      let coinTotal = listOfCoinPrices[item.name.toLowerCase()]
        ? item.amount * listOfCoinPrices[item.name.toLowerCase()].gbp
        : 0;
      let percentChange = listOfCoinPrices[item.name.toLowerCase()]
        ? listOfCoinPrices[item.name.toLowerCase()].gbp_24h_change / 100
        : 0;
      counter += coinTotal;
      percentageIncrease.push(coinTotal * (1 - percentChange));
    });

    // Add together previous totals for coins
    percentageIncrease.map((prev) => {
      previousTotal += prev;
    });

    return {
      total: Math.round((counter + Number.EPSILON) * 100) / 100,
      // Generate percentage change for total from coins prev amounts
      percent: (1 - previousTotal / counter) * 100,
      previous24hr: Number(previousTotal.toFixed(2)),
    };
  };

  return (
    <SmallWidget
      name="Investments"
      figure={getBuysTotal().total.toLocaleString("en-GB")}
      percentageDiff={getBuysTotal().percent.toLocaleString("en-GB")}
      prevPrice={getBuysTotal().previous24hr.toLocaleString("en-GB")}
    />
  );
};

export default InvestmentTotal;
