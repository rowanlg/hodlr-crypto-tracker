import React from "react";
import SmallWidget from "../SmallWidget";

const BTCPrice = () => {
  const [btcPrice, setBtcPrice] = React.useState(0);
  const [btcMonthChange, setBtcMonthChange] = React.useState(0);
  React.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBtcPrice(data.market_data.current_price.gbp);
        setBtcMonthChange(
          data.market_data.price_change_percentage_30d.toFixed(2)
        );
      })
      .catch((err) => console.log(err));
  }, []);

  // console.log(btcMonthChange);

  const monthChangeCalc =
    Math.round(
      (btcPrice - btcPrice * (btcMonthChange / 100)) * 100 + Number.EPSILON
    ) / 100;
  return (
    <SmallWidget
      name="BTC Price"
      figure={btcPrice.toLocaleString("en-GB")}
      percentageDiff={btcMonthChange.toLocaleString("en-GB")}
      lastMonth={monthChangeCalc.toLocaleString("en-GB")}
    />
  );
};

export default BTCPrice;
// .toLocaleString("en-GB")
// data-BTC-quote-GBP-price (percent_change_30d)
