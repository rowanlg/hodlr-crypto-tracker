import React from "react";
import styled from "styled-components";
import colours from "../colours";

const LatestInvestmentsSection = styled.div`
  /* grid-columns: 1 / span 4; */
  grid-row: span 7;
  background-color: ${colours.mainBlue};
  padding: ${colours.padding};
  border-radius: ${colours.borderRadius};
  overflow-y: scroll;
`;

const LatestInvestments = () => {
  return (
    <LatestInvestmentsSection>
      <ul>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
        <li>fldsjf</li>
      </ul>
    </LatestInvestmentsSection>
  );
};

export default LatestInvestments;
