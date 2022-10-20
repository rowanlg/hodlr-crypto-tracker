import React from "react";
import styled from "styled-components";
import colours from "../../colours";

const AddModalContent = ({ token, listOfCoins, setAddModalShow }) => {
  const [addData, setAddData] = React.useState({
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
  const [coinFound, setCoinFound] = React.useState(false);
  const [showError, setShowError] = React.useState(false);
  const [listOfCoinNames, setListOfCoinNames] = React.useState([]);
  const [coinOptions, setCoinOptions] = React.useState({});

  React.useEffect(() => {
    listOfCoins.map((coin) => {
      setListOfCoinNames((prev) => [...prev, coin.name]);
    });
  }, []);

  React.useEffect(() => {
    if (listOfCoinNames.includes(addData.name)) {
      setCoinOptions({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name: addData.name,
          amount:
            addData.type == "buy"
              ? Number(
                  listOfCoins[
                    listOfCoins.findIndex(
                      (object) => object.name == addData.name
                    )
                  ].amount
                ) + Number(addData.amount)
              : Number(
                  listOfCoins[
                    listOfCoins.findIndex(
                      (object) => object.name == addData.name
                    )
                  ].amount
                ) - Number(addData.amount),
        }),
      });
    } else {
      setCoinOptions({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name: addData.name,
          amount: addData.amount,
        }),
      });
    }
  }, [addData]);

  // console.log(addData);

  function processData() {
    const investmentOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify({
        type: addData.type,
        name: addData.name,
        ticker: addData.ticker,
        price_bought_for: addData.cost,
        amount: addData.amount,
        datetime: addData.datetime,
        location: addData.location,
      }),
    };

    fetch(process.env.SERVER_URL + `/api/investment`, investmentOptions)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    fetch(
      process.env.SERVER_URL +
        `/api/coins_held${
          listOfCoinNames.includes(addData.name) ? "/" + addData.name : ""
        }`,
      coinOptions
    )
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  function handleNameSubmittion() {
    console.log("submitted");
    fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${addData.name}&vs_currencies=gbp`,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data[addData.name]) {
          setShowError(true);
        } else {
          setStep(step + 1);
        }
      })
      .catch((err) => {
        console.log(err.error);
      });
  }

  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.substring(1);
  }

  const steps = () => {
    const listData = Object.entries(addData).map((item, index) => {
      if (index !== Object.entries(addData).length - 1) {
        return (
          <li key="index">
            <span className="name">{capitalize(item[0])}: </span>
            <span className="value">
              {typeof item[1] === "string" ? capitalize(item[1]) : item[1]}
            </span>
          </li>
        );
      }
    });

    switch (step) {
      case 1:
        return (
          <div className="form">
            <h5>Type</h5>
            <label>
              <select
                name="type"
                id="type"
                onChange={(e) =>
                  setAddData((prev) => ({ ...prev, type: e.target.value }))
                }
              >
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
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
                onClick={() => setStep(step < 4 ? step + 1 : step)}
              >
                Next
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form">
            <h5>Name</h5>
            <label>
              <input
                type="text"
                name="name"
                required
                value={capitalize(addData.name)}
                onChange={(e) => {
                  setShowError(false);
                  setAddData((prev) => ({
                    ...prev,
                    name: e.target.value.toLowerCase(),
                  }));
                }}
              />
            </label>
            {showError ? (
              <p className="error">
                Error: No coin found <br />
                <span
                  onClick={() => {
                    setStep(step + 1);
                    setAddData((prev) => ({ ...prev, found: false }));
                  }}
                >
                  Continue
                </span>{" "}
                with no market data?
              </p>
            ) : null}

            <div className="buttons">
              <button
                className="save"
                onClick={() => setStep(step > 1 ? step - 1 : step)}
              >
                Previous
              </button>
              <button
                className="save"
                onClick={handleNameSubmittion}
                disabled={showError || !addData.name ? "disabled" : ""}
              >
                Next
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form">
            <h5>Info</h5>
            <div>
              <label>
                Ticker
                <input
                  type="text"
                  name="ticker"
                  required
                  value={addData.ticker}
                  onChange={(e) =>
                    setAddData((prev) => ({
                      ...prev,
                      ticker: e.target.value.toUpperCase(),
                    }))
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Amount
                <input
                  type="number"
                  name="amount"
                  step="0.0000000001"
                  required
                  value={addData.amount}
                  onChange={(e) =>
                    setAddData((prev) => ({ ...prev, amount: e.target.value }))
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
                  value={addData.cost}
                  onChange={(e) =>
                    setAddData((prev) => ({ ...prev, cost: e.target.value }))
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
                  value={addData.location}
                  onChange={(e) =>
                    setAddData((prev) => ({
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
                  value={addData.datetime}
                  onChange={(e) =>
                    setAddData((prev) => ({
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
                onClick={() => setStep(step < 4 ? step + 1 : step)}
                disabled={
                  addData.ticker &&
                  addData.amount &&
                  addData.cost &&
                  addData.location &&
                  addData.datetime
                    ? ""
                    : "disabled"
                }
              >
                Next
              </button>
            </div>
          </div>
        );

      case 4:
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
                  setAddModalShow(false);
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
        <p style={{ color: step !== 3 ? colours.deactivatedWhite : "" }}>3</p>
        <div className="break" />
        <p style={{ opacity: step !== 4 ? 0.5 : 1 }}>✅</p>
      </div>
      {steps()}
    </>
  );
};

export default AddModalContent;
