import React from "react";
import styled from "styled-components";
import colours from "../colours";

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
    width: calc(60% - 60px);
    text-align: center;
    z-index: 1;
    background-color: ${colours.mainBlue};
    padding: ${colours.padding};
    border-radius: ${colours.borderRadius};
    position: relative;
    .exit {
      position: absolute;
      top: 20px;
      right: 20px;
      cursor: pointer;
    }

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      input.save {
        margin: 10px;
        background-color: ${colours.darkBlue};
        border: none;
        padding: 5px 15px;
        border-radius: 5px;
        cursor: pointer;
      }
      div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: flex-start;
        label {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
          margin: 10px;
          font-size: 0.8rem;
          input {
            margin: 5px 0;
            width: 170px;
            background-color: inherit;
            border: none;
            border-bottom: 1px solid ${colours.veryDeactivated};
          }
        }
      }
    }
  }
`;

const AddModal = ({ setAddModalShow }) => {
  const [addData, setAddData] = React.useState({
    name: "",
    ticker: "",
    amount: 0,
    cost: 0,
    location: "",
    datetime: "",
  });

  const handleSaveClick = () => {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addData.name,
        ticker: addData.ticker,
        price_bought_for: addData.cost / addData.amount,
        amount: addData.amount,
        datetime: addData.datetime,
        location: addData.location,
      }),
    };
    // if (
    //   addData.name &&
    //   addData.ticker &&
    //   addData.cost &&
    //   addData.amount &&
    //   addData.datetime &&
    //   addData.location
    // ) {
    fetch(`http://localhost:8000/user/buy`, options)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    // setAddModalShow(false);
    // }
  };
  console.log(addData);
  return (
    <AddModalContainer>
      <div className="content">
        <h3>Add an Investment</h3>
        <svg
          className="exit"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setAddModalShow(false)}
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
        <form>
          <div>
            <label>
              Name
              <input
                type="text"
                name="name"
                required
                onChange={(e) =>
                  setAddData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </label>
            <label>
              Ticker
              <input
                type="text"
                name="ticker"
                required
                onChange={(e) =>
                  setAddData((prev) => ({ ...prev, ticker: e.target.value }))
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
                onChange={(e) =>
                  setAddData((prev) => ({ ...prev, location: e.target.value }))
                }
              />
            </label>
            <label>
              Date & Time
              <input
                type="datetime-local"
                name="datetime"
                required
                onChange={(e) =>
                  setAddData((prev) => ({ ...prev, datetime: e.target.value }))
                }
              />
            </label>
          </div>
          <input
            type="submit"
            name="Save"
            value="Save"
            className="save"
            onClick={() => handleSaveClick()}
          />
        </form>
      </div>
    </AddModalContainer>
  );
};

export default AddModal;
