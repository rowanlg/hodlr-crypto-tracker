import React from "react";
import styled from "styled-components";
import colours from "../colours";

const TrendingContent = styled.div`
  /* border: 1px solid red; */
  /* height: 100%; */
  .list {
    /* border: 1px solid green; */
    background-color: ${colours.darkBlue};
    border-radius: ${colours.borderRadius};
    padding: 15px;
    .line-break {
      width: 100%;
      margin: 10px auto;
      height: 1px;
      background-color: ${colours.veryDeactivated};
    }
    .coin-row {
      display: grid;
      grid-template-columns: 0.3fr 0.3fr 1fr 1fr 1fr;
      grid-template-rows: 1fr;
      gap: 0px 0px;
      grid-template-areas: "score thumb name rank price";

      * {
        margin: auto 0;
        font-size: 0.8rem;
      }
      .score {
        grid-area: score;
        padding-left: 15px;
      }
      .thumb {
        grid-area: thumb;
        width: 25px;
        height: 25px;
        border-radius: 5px;
      }
      .rank {
        grid-area: rank;
      }
      .name {
        grid-area: name;
      }
      .price {
        grid-area: price;
        color: ${colours.green};
        font-size: 0.9rem;
        font-weight: 500;
        text-align: right;
        padding-right: 15px;
      }
    }
  }
`;

const Trending = () => {
  const [trendingCoins, setTrendingCoins] = React.useState([]);
  const [btcPrice, setBtcPrice] = React.useState(0);
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
    fetch("https://api.coingecko.com/api/v3/coins/bitcoin")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.market_data.current_price.gbp);
        setBtcPrice(data.market_data.current_price.gbp);
      })
      .catch((err) => console.log(err));
  }, []);

  const showTrending = trendingCoins.map((coin, index) => {
    if (index < 5) {
      return (
        <>
          <div key={coin.item.name} className="coin-row">
            <p className="score">{coin.item.score + 1 + "."}</p>
            <img
              className="thumb"
              src={coin.item.small}
              alt={coin.item.name + " thumbnail"}
            />
            <p className="rank">MC Rank: {coin.item.market_cap_rank}</p>
            <p className="name">{coin.item.name}</p>
            <p className="price">
              {coin.item.price_btc * btcPrice > 10
                ? "£" + (coin.item.price_btc * btcPrice).toFixed(2)
                : "£" + (coin.item.price_btc * btcPrice).toFixed(4)}
            </p>
          </div>
          {index !== 4 ? <div className="line-break" /> : null}
        </>
      );
    }
  });
  return (
    <TrendingContent>
      <h4>Top 5 Trending Coins</h4>
      <div className="list">{showTrending}</div>
    </TrendingContent>
  );
};

export default Trending;
