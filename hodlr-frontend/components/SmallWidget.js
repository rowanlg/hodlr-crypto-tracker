import React from "react";
import styled from "styled-components";
import colours from "./colours";

const SmallWidget = ({ name, figure, percentageDiff, prevPrice }) => {
  return (
    <SmallWidgetSection>
      <div className="content">
        <h4>{name}</h4>
        <p
          className="price"
          style={
            percentageDiff > 0
              ? { color: colours.green }
              : { color: colours.red }
          }
        >
          £{figure}
          <span>
            {" "}
            {percentageDiff > 0 ? "+" + percentageDiff : percentageDiff}%
          </span>
        </p>
        {prevPrice ? (
          <p className="bottom-text">Compared to £{prevPrice} (24h)</p>
        ) : null}
      </div>
    </SmallWidgetSection>
  );
};

export default SmallWidget;

const SmallWidgetSection = styled.div`
  height: 100%;
  width: 100%;
  border-radius: ${colours.borderRadius};
  background-color: ${colours.mainBlue};
  padding: ${colours.padding};
  div.content {
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    h4 {
      font-weight: 500;
    }
    p.price {
      font-size: 1.3rem;
      span {
        font-size: 0.6em;
        font-weight: 500;
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
