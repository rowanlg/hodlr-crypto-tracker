import React from "react";
import styled from "styled-components";
import colours from "../../colours";
import { UserContext } from "../../../context/UserContext";

const DeleteModalContent = ({ buysData, setDeleteModalShow, listOfCoins }) => {
  const [transactionId, setTransactionId] = React.useState(null);
  const [confirmShow, setConfirmShow] = React.useState(false);
  const [token] = React.useContext(UserContext);

  // Request for deleting transaction by ID and removing that coin amount from coin held data
  function handleSubmitDelete() {
    const deleteOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "*/*",
        Authorization: "Bearer " + token,
      },
    };
    const putOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: buysData[transactionId].name,
        amount:
          listOfCoins[
            listOfCoins.findIndex(
              (object) => object.name == buysData[transactionId].name
            )
          ].amount - buysData[transactionId].amount,
      }),
    };
    fetch(`/api/investment/${buysData[transactionId].id}`, deleteOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));

    fetch(`/api/coins_held/${buysData[transactionId].name}`, putOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));

    window.location.reload();
  }

  // All available transactions for deleting
  const transactions = buysData.map((transaction, index) => {
    return (
      <option key={index} value={index}>
        {transaction.datetime.slice(0, 10)} | {transaction.amount} |{" "}
        {transaction.name}
      </option>
    );
  });

  return (
    <DeleteContainer>
      {!confirmShow ? (
        <>
          <select
            onChange={(e) => {
              setTransactionId(e.target.value);
            }}
          >
            <option></option>
            {transactions}
          </select>
          <button onClick={() => setConfirmShow(true)}>Delete</button>
        </>
      ) : null}
      {confirmShow ? (
        <div className="confirm-container">
          <p>Are you sure?</p>
          <button
            onClick={() => {
              handleSubmitDelete();
              setConfirmShow(false);
              setDeleteModalShow(false);
            }}
          >
            Yes
          </button>
          <button onClick={() => setConfirmShow(false)}>No</button>
        </div>
      ) : null}
    </DeleteContainer>
  );
};

export default DeleteModalContent;

const DeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  button {
    margin: 10px 0;
    background-color: ${colours.darkBlue};
    border: none;
    padding: 5px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  .confirm-container {
  }
`;
