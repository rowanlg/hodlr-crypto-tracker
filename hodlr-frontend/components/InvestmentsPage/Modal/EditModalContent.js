import React from "react";
import styled from "styled-components";
import colours from "../../colours";

const EditModalContent = ({
  token,
  listOfCoins,
  setEditModalShow,
  buysData,
  listOfCoinNames,
}) => {
  const [editData, setEditData] = React.useState({
    type: "buy",
    name: "",
    ticker: "",
    amount: 0,
    cost: 0,
    location: "",
    datetime: "",
    found: true,
  });
  const [step, setStep] = React.useState(1);
  const [transactionId, setTransactionId] = React.useState(null);

  // Process data and remove or add amount of coins to coin held data
  function processData() {
    const investmentOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify({
        type: editData.type,
        name: editData.name,
        ticker: editData.ticker,
        price_bought_for: editData.cost,
        amount: editData.amount,
        datetime: editData.datetime,
        location: editData.location,
      }),
    };

    const coinOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        name: editData.name,
        amount:
          Number(editData.amount) > buysData[transactionId].amount
            ? listOfCoins[
                listOfCoins.findIndex((object) => object.name == editData.name)
              ].amount +
              (Number(editData.amount) - buysData[transactionId].amount)
            : listOfCoins[
                listOfCoins.findIndex((object) => object.name == editData.name)
              ].amount -
              (buysData[transactionId].amount - Number(editData.amount)),
      }),
    };

    fetch(`/api/investment/${buysData[transactionId].id}`, investmentOptions)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    fetch(`/api/coins_held/${editData.name}`, coinOptions)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
  }

  // Progress of edit modal
  const steps = () => {
    const listData = Object.entries(editData).map((item, index) => {
      if (index !== Object.entries(editData).length - 1) {
        return (
          <li key={index}>
            <span className="name">{capitalize(item[0])}: </span>
            <span className="value">
              {typeof item[1] === "string" ? capitalize(item[1]) : item[1]}
            </span>
          </li>
        );
      }
    });

    // Map all available transactions to edit
    const transactions = buysData.map((transaction, index) => {
      return (
        <option key={index} value={index}>
          {transaction.datetime.slice(0, 10)} | {transaction.amount} |{" "}
          {transaction.name}
        </option>
      );
    });

    // Modal steps
    switch (step) {
      case 1:
        return (
          <div className="form">
            <h5>Choose a Transaction to Edit</h5>
            <label>
              <select
                onChange={(e) => {
                  setTransactionId(e.target.value);
                  // console.log(e.target.value);
                }}
              >
                <option></option>
                {transactions}
              </select>
            </label>
            <div className="buttons">
              <button
                className="save"
                onClick={() => setStep(step > 1 ? step - 1 : step)}
                disabled
              >
                Previous
              </button>
              <button
                className="save"
                onClick={() => {
                  setStep(step < 3 ? step + 1 : step);
                  setEditData(buysData[transactionId]);
                  setEditData((prev) => ({
                    ...prev,
                    cost: buysData[transactionId].price_bought_for,
                  }));
                }}
                disabled={transactionId === null ? "disabled" : ""}
              >
                Next
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form">
            <h5>Edit {capitalize(buysData[transactionId].name)} Info</h5>
            <div>
              <label>
                Amount
                <input
                  type="number"
                  name="amount"
                  step="0.0000000001"
                  required
                  value={editData.amount}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, amount: e.target.value }))
                  }
                />
              </label>
              <label>
                Cost
                <input
                  type="number"
                  name="cost"
                  step="0.0000000001"
                  required
                  value={editData.cost}
                  onChange={(e) =>
                    setEditData((prev) => ({ ...prev, cost: e.target.value }))
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Location
                <input
                  type="text"
                  name="location"
                  required
                  value={editData.location}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                />
              </label>
              <label>
                Date & Time
                <input
                  type="datetime-local"
                  name="datetime"
                  required
                  value={editData.datetime}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      datetime: e.target.value,
                    }))
                  }
                />
              </label>
            </div>

            <div className="buttons">
              <button
                className="save"
                onClick={() => setStep(step > 1 ? step - 1 : step)}
              >
                Previous
              </button>
              <button
                className="save"
                onClick={() => {
                  setStep(step < 3 ? step + 1 : step);
                }}
                disabled={
                  editData.ticker &&
                  editData.amount &&
                  editData.cost &&
                  editData.location &&
                  editData.datetime
                    ? ""
                    : "disabled"
                }
              >
                Next
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form">
            <h5>Confirm</h5>
            <ul>{listData}</ul>

            <div className="buttons">
              <button
                className="save"
                onClick={() => setStep(step > 1 ? step - 1 : step)}
              >
                Previous
              </button>
              <button
                className="save"
                onClick={() => {
                  processData();
                  setEditModalShow(false);
                  window.location.reload();
                }}
              >
                Save
              </button>
            </div>
          </div>
        );

      default:
        break;
    }
  };

  return (
    <>
      <div className="step-section">
        <p style={{ color: step !== 1 ? colours.deactivatedWhite : "" }}>1</p>
        <div className="break" />
        <p style={{ color: step !== 2 ? colours.deactivatedWhite : "" }}>2</p>
        <div className="break" />
        <p style={{ opacity: step !== 3 ? 0.5 : 1 }}>✅</p>
      </div>
      {steps()}
    </>
  );
};

export default EditModalContent;
