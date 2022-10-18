import React from "react";
import styled from "styled-components";
import colours from "../colours";
import { UserContext } from "../../context/UserContext";
import AddModalContent from "./Modal/AddModalContent";
import DeleteModalContent from "./Modal/DeleteModalContent";

const AddModalContainer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  div.content {
    /* border: 1px solid red; */
    width: calc(60% - 60px);
    text-align: center;
    z-index: 1;
    background-color: ${colours.mainBlue};
    padding: ${colours.padding};
    border-radius: ${colours.borderRadius};
    position: relative;
    .step-section {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      margin: auto;
      /* border: 1px solid red; */
      p {
        margin: 0;
        font-size: 0.8rem;
      }
      .break {
        width: 30px;
        height: 2px;
        border-radius: 3px;
        background-color: ${colours.deactivatedWhite};
        margin: auto 5px;
      }
    }
    .error-message {
      font-size: 0.6rem;
      span {
        color: ${colours.green};
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .exit {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }
    .save {
      margin: 5px;
      background-color: ${colours.darkBlue};
      border: none;
      padding: 5px 15px;
      border-radius: 5px;
      cursor: pointer;
    }
    div.form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 50px 50px 10px;
      ul {
        text-align: left;
        padding: 0;
        li {
          list-style: none;
          font-size: 0.8rem;
          display: flex;
          justify-content: space-between;
          margin: auto;
          span {
            margin: 0 10px;
          }
          span.name {
            font-weight: 600;
            color: ${colours.orange};
          }
          span.value {
          }
        }
      }
      p.error {
        color: ${colours.red};
        font-size: 0.8rem;
        span {
          text-decoration: underline;
          color: ${colours.orange};
          cursor: pointer;
        }
      }
      h5 {
        margin: 0;
        text-align: left;
      }
      label {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        /* margin: 10px; */
        font-size: 0.8rem;
        input,
        select {
          margin: 5px 0;
          width: 170px;
          background-color: inherit;
          border: none;
          border-bottom: 1px solid ${colours.veryDeactivated};
        }
      }
      .buttons {
        margin: 30px 0 0;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .save {
        margin: 10px;
        background-color: ${colours.darkBlue};
        border: none;
        padding: 5px 15px;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
`;

const Modal = ({
  addModalShow,
  setAddModalShow,
  editModalShow,
  setEditModalShow,
  deleteModalShow,
  setDeleteModalShow,
  listOfCoins,
  buysData,
}) => {
  const [token] = React.useContext(UserContext);

  return (
    <AddModalContainer>
      <div className="content">
        <h3>
          {addModalShow ? "Add" : editModalShow ? "Edit" : "Delete"} a
          Transaction
        </h3>
        <svg
          className="exit"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() =>
            addModalShow
              ? setAddModalShow(false)
              : editModalShow
              ? setEditModalShow(false)
              : setDeleteModalShow(false)
          }
        >
          <path
            d="M1.78711 10.7122L10.525 2.07862"
            stroke="#EDEDED"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M2.05225 2L10.6244 10.6765"
            stroke="#EDEDED"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
        {addModalShow ? (
          <AddModalContent
            listOfCoins={listOfCoins}
            token={token}
            setAddModalShow={setAddModalShow}
          />
        ) : editModalShow ? null : (
          <DeleteModalContent
            buysData={buysData}
            setDeleteModalShow={setDeleteModalShow}
            listOfCoins={listOfCoins}
          />
        )}
      </div>
    </AddModalContainer>
  );
};

export default Modal;
