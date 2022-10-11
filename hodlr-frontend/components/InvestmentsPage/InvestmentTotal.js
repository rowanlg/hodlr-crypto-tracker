import React from "react";
import SmallWidget from "../SmallWidget";

const InvestmentTotal = ({ buysData }) => {
  const getBuysTotal = () => {
    let counter = 0;
    Object.entries(buysData).map((item) => {
      counter += buysData[item[0]].amount * buysData[item[0]].price_bought_for;
    });
    return Math.round((counter + Number.EPSILON) * 100) / 100;
  };

  const lastMonth =
    Math.round((getBuysTotal() * 0.3 + Number.EPSILON) * 100) / 100;

  return (
    <SmallWidget
      name="Investments"
      figure={getBuysTotal().toLocaleString("en-GB")}
      percentageDiff={0.3}
      lastMonth={lastMonth.toLocaleString("en-GB")}
    />
  );
};

export default InvestmentTotal;
