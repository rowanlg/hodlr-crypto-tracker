import React from "react";
import SmallWidget from "../SmallWidget";

const ETHPrice = () => {
  const [ethData, setEthData] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/coins/ethereum")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setEthData({
          price: data.market_data.current_price.gbp,
          change24h: data.market_data.price_change_percentage_24h,
        });
      })
      .then(() => setLoading(false))
      .catch((err) => console.log(err));
  }, []);

  const monthChangeCalc =
    ethData.price - ethData.price * (ethData.change24h / 100);
  return (
    <>
      {!loading ? (
        <SmallWidget
          name="ETH Price"
          figure={ethData.price.toLocaleString("en-GB")}
          percentageDiff={ethData.change24h.toLocaleString("en-GB")}
          lastMonth={monthChangeCalc.toLocaleString("en-GB")}
        />
      ) : null}
    </>
  );
};

export default ETHPrice;
