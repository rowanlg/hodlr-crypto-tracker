import React from "react";
import styled from "styled-components";
import colours from "../colours";

const ButtonContainer = styled.div`
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    width: 36px;
    height: 36px;
    /* padding: 5px; */
    margin-left: 15px;
    border-radius: ${colours.borderRadius};
    background-color: ${colours.mainBlue};
    border: none;
    cursor: pointer;
    svg {
      margin: auto;
    }
  }
`;

const Buttons = ({
  addModalShow,
  setAddModalShow,
  editModalShow,
  setEditModalShow,
  deleteModalShow,
  setDeleteModalShow,
}) => {
  return (
    <ButtonContainer>
      <button onClick={() => setAddModalShow(true)}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.1675 9.08H9.3435V14.808H6.6555V9.08H0.8315V6.552H6.6555V0.792H9.3435V6.552H15.1675V9.08Z"
            fill="#EDEDED"
          />
        </svg>
      </button>
      <button onClick={() => setEditModalShow(true)}>
        <svg
          width="17"
          height="17"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.5043 4.99327L15.8835 6.61403C15.7183 6.77927 15.4511 6.77927 15.2858 6.61403L11.3833 2.71153C11.218 2.54629 11.218 2.27909 11.3833 2.11385L13.0041 0.493086C13.6615 -0.164362 14.7303 -0.164362 15.3913 0.493086L17.5043 2.60606C18.1652 3.26351 18.1652 4.3323 17.5043 4.99327ZM9.99104 3.5061L0.758577 12.7385L0.0132301 17.0101C-0.0887278 17.5867 0.41403 18.086 0.990619 17.9875L5.2623 17.2387L14.4948 8.00628C14.66 7.84103 14.66 7.57384 14.4948 7.4086L10.5922 3.5061C10.4235 3.34086 10.1563 3.34086 9.99104 3.5061V3.5061ZM4.36226 11.9474C4.16889 11.7541 4.16889 11.4447 4.36226 11.2513L9.77657 5.83705C9.96994 5.64368 10.2793 5.64368 10.4727 5.83705C10.6661 6.03042 10.6661 6.3398 10.4727 6.53317L5.05839 11.9474C4.86502 12.1408 4.55563 12.1408 4.36226 11.9474V11.9474ZM3.09306 14.9042H4.78064V16.1804L2.51296 16.5777L1.41955 15.4843L1.81683 13.2166H3.09306V14.9042Z"
            fill="#EDEDED"
          />
        </svg>
      </button>
      <button onClick={() => setDeleteModalShow(true)}>
        <svg
          width="18"
          height="17"
          viewBox="0 0 19 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.4783 9.72085C19.1739 8.9677 19.1739 7.74659 18.4783 6.99345L12.5408 0.564875C11.8452 -0.188272 10.7174 -0.188312 10.0217 0.564875L0.521711 10.8506C-0.173904 11.6037 -0.173904 12.8248 0.521711 13.578L4.08421 17.4351C4.41827 17.7968 4.87135 18 5.34377 18H18.5547C18.8006 18 19 17.7841 19 17.5179V15.9107C19 15.6445 18.8006 15.4286 18.5547 15.4286H13.2066L18.4783 9.72085V9.72085ZM7.248 7.20458L12.3458 12.724L9.84784 15.4286H5.58973L2.62098 12.2143L7.248 7.20458V7.20458Z"
            fill="#EDEDED"
          />
        </svg>
      </button>
    </ButtonContainer>
  );
};

export default Buttons;
