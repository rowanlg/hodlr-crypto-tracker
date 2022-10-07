import React from "react";
import styled from "styled-components";
import colours from "./colours";

const InvestmentTotalSection = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 10px;
  background-color: ${colours.mainBlue};
  padding: 1.5vw;
  div.content {
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    h4 {
      font-size: 1.2rem;
      font-weight: 500;
    }
    p.price {
      font-size: 1.3rem;
      span {
        font-size: 0.6em;
      }
    }
    p.bottom-text {
      font-size: 0.7em;
    }
    h4,
    p {
      margin: 3px;
    }
  }
`;

const InvestmentTotal = () => {
  const [buysData, setBuysData] = React.useState({});

  React.useEffect(() => {
    fetch("http://localhost:8000/user/buys")
      .then((res) => res.json())
      .then((data) => {
        setBuysData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getBuysTotal = () => {
    let counter = 0;
    Object.entries(buysData).map((item) => {
      counter += buysData[item[0]].amount * buysData[item[0]].price_bought_for;
    });
    return Math.round((counter + Number.EPSILON) * 100) / 100;
  };

  return (
    <InvestmentTotalSection>
      <div className="content">
        <h4>Investments</h4>
        <p className="price" style={{ color: colours.green }}>
          ${getBuysTotal()}
          <span>+1.3%</span>
        </p>
        <p className="bottom-text">Compared to $30,435 (Last Month)</p>
      </div>
    </InvestmentTotalSection>
  );
};

export default InvestmentTotal;
