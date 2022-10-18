import React from "react";
import styled from "styled-components";

const TrendingContent = styled.div`
  .coin-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

const Trending = () => {
  const [trendingCoins, setTrendingCoins] = React.useState([]);
  React.useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/search/trending", {
      "Content-Type": "application/json",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTrendingCoins(data.coins);
      })
      .catch((err) => console.log(err));
  }, []);

  const showTrending = trendingCoins.map((coin) => {
    return (
      <div key={coin.item.name} className="coin-row">
        <img src={coin.item.thumb} alt={coin.item.name + " thumbnail"} />
        <p>{coin.item.name}</p>
        <p>{coin.item.market_cap_rank}</p>
        <p>{coin.item.price_btc}</p>
      </div>
    );
  });
  return <TrendingContent>{showTrending}</TrendingContent>;
};

export default Trending;
