import React from "react";
import SmallWidget from "../SmallWidget";

const BTCPrice = () => {
  const [btcData, setBtcData] = React.useState({});
  const [btcMonthChange, setBtcMonthChange] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setBtcData({
          price: data.market_data.current_price.gbp,
          change24h: data.market_data.price_change_percentage_24h,
        });
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  const monthChangeCalc =
    btcData.price - btcData.price * (btcData.change24h / 100);
  return (
    <>
      {!loading ? (
        <SmallWidget
          name="BTC Price"
          figure={btcData.price.toLocaleString("en-GB")}
          percentageDiff={btcData.change24h.toLocaleString("en-GB")}
          lastMonth={monthChangeCalc.toLocaleString("en-GB")}
        />
      ) : null}
    </>
  );
};

export default BTCPrice;
