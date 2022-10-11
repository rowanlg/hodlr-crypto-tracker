import React from "react";
import styled from "styled-components";
import colours from "./colours";

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
      font-size: 1.2rem;
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

const SmallWidget = ({ name, figure, percentageDiff, lastMonth }) => {
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
        {lastMonth ? (
          <p className="bottom-text">Compared to £{lastMonth} (Last Month)</p>
        ) : null}
      </div>
    </SmallWidgetSection>
  );
};

export default SmallWidget;
