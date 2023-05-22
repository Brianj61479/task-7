/** @format */

import React from "react";
import axios from "axios";
import { useReducer, useEffect, useState } from "react";

const Converter = () => {
  const initialState = {
    GBP: null,
    USD: null,
    EUR: null,
    currentTime: "",
    euroToBTC: 0,
    gbpToBTC: 0,
    usdToBTC: 0,
    BTCtoEuro: 0,
    BTCtoGBP: 0,
    BTCtoUSD: 0,

    converted: 0,
  };
  useEffect(() => {
    axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((data) => {
        console.log("Data", data);
        const euroRateFloat = data.data.bpi.EUR.rate_float;
        const gbpRateFloat = data.data.bpi.GBP.rate_float;
        const usdRateFloat = data.data.bpi.USD.rate_float;
        const currentTime = data.data.time.updated;

        dispatch({
          type: "currency_update",
          EUR: euroRateFloat,
          GBP: gbpRateFloat,
          USD: usdRateFloat,
          TIME: currentTime,
        });
        return data;
      });
  }, []);

  const reducer = (state, action) => {
    console.log("reducer state", state);
    console.log("action", action);

    switch (action.type) {
      case "currency_update":
        return {
          ...state,
          GBP: action.GBP,
          USD: action.USD,
          EUR: action.EUR,
          TIME: action.TIME,
        };

      case "CONVERT_TO_BTC":
        return {
          ...state,

          euroToBTC: action.payload * state.EUR,
          gbpToBTC: action.payload * state.GBP,
          usdToBTC: action.payload * state.USD,

          BTCtoEURO: state.EUR / action.payload,
          BTCtoGBP: state.GBP / action.payload,
          BTCtoUSD: state.USD / action.payload,

          // converted: action.setConverted,
        };
      case "SET_CONVERT_SELECTED":
        return {
          ...state,
          converted: action.payload,
        };

      default:
        console.error("Error in Reducer");
    }

    return state;
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const options = [
    // { id: "", value: "", text: "--Choose an Option--" },
    // { id: "EUR to BTC", value: "EUR to BTC", text: "EUR to BTC" },
    // { id: "GBP to BTC", value: "GBP to BTC", text: "GBP to BTC" },
    // { id: "USD to BTC", value: "USD to BTC", text: "USD to BTC" },
    // { id: "BTC to EUR", value: "BTC to EUR", text: "BTC to EUR" },
    // { id: "BTC to GBP", value: "BTC to GBP", text: "BTC to GBP" },
    // { id: "BTC to USD", value: "BTC to USD", text: "BTC to USD" },

    { id: "1", value: state.gbpToBTC, text: "GBP to BTC" },
    { id: "2", value: state.euroToBTC, text: "EUR to BTC" },
    { id: "3", value: state.usdToBTC, text: "USD to BTC" },
    { id: "4", value: state.BTCtoGBP, text: "BTC to GBP" },
    { id: "5", value: state.BTCtoEURO, text: "BTC to EUR" },
    { id: "6", value: state.BTCtoUSD, text: "BTC to USD" },
  ];

  const currencies = [
    { id: "1", value: state.gbpToBTC, text: "GBP to BTC" },
    { id: "2", value: state.euroToBTC, text: "EUR to BTC" },
    { id: "3", value: state.usdToBTC, text: "USD to BTC" },
    { id: "4", value: state.BTCtoGBP, text: "BTC to GBP" },
    { id: "5", value: state.BTCtoEURO, text: "BTC to EUR" },
    { id: "6", value: state.BTCtoUSD, text: "BTC to USD" },
  ];

  const [selectedConversion, setSelectedConversion] = useState(
    options[0].value
  );
  const [converted, setConverted] = useState(currencies[0].value);

  const handleChange = (event) => {
    console.log("event.target.value", event.target.value);
    console.log("converted", converted);
    setSelectedConversion(event.target.value);
    switch (event.target.value) {
      case "EUR to BTC": {
        dispatch({
          type: "SET_CONVERT_SELECTED",
          payload: state.euroToBTC,
        });
        setConverted(state.euroToBTC);
      }
      // case "GBP to BTC": {
      // setConverted(state.GBPtoBTC);
      // }
      // case "USD to BTC": {
      // setConverted(state.USDtoBTC);
      // }
    }
  };
  const [sortedData, setSortedData] = useState([options]);
  const handleSort = () => {
    const sortedData = [...options].sort((a, b) => {
      return b.first - a.first ? 1 : -1;
    }, []);
    setSortedData(sortedData);
  };

  return (
    <div>
      <div className="h1">
        Time : {state.TIME} <br></br>
      </div>

      <div>
        {/* Drop Down Menu */}
        <label htmlFor="Select Currency">
          Select Currency To Convert From:
          <select
            name="value"
            defaultValue="---Select---"
            value={selectedConversion}
            onChange={handleChange}
          >
            {options.map((option) => (
              <option key={option.id} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </label>

        <div>
          {/* listed array of converted currencies */}
          <label name="Currency" htmlFor="Sort Currency">
            Select Currency To Convert From:
            <pre value={sortedData} onChange={handleChange}>
              {sortedData.map((sort) => (
                <ul key={sort.id} value={sort.value}>
                  {sort.text} {sort.value}
                </ul>
              ))}
            </pre>
          </label>
          <div></div>
          <nav>
            <label htmlFor="Converted Amount">
              Amount For Conversion
              <input
                id="Input"
                className="Convert From"
                type="number"
                placeholder="Enter Amount"
                onChange={(e) =>
                  dispatch({
                    type: "CONVERT_TO_BTC",
                    payload: parseInt(e.currentTarget.value, 10),
                  })
                }
              />
            </label>
          </nav>

          <label htmlFor="converted">
            Converted from {selectedConversion}{" "}
          </label>
          <input
            htmlFor="label"
            type="text"
            defaultValue={converted}
            placeholder="Converted Rate Here"
          />
        </div>
      </div>

      <div>
        {/* <ul>
          {currencies.map((currency) => (
            <li key='' value={currency.value}>
              {currency.text} {currency.value} {selectedConversion}
            </li>
          ))}
        </ul>{" "}
        */}
        <button name="Sort Currency" className="sort" onClick={handleSort}>
          Sort currency order
        </button>
      </div>

      {/* <label>
        GBP to Bitcoin:{state.gbpToBTC} <br></br>
        USD to Bitcoin:{state.usdToBTC} <br></br>
        EUR to BitCoin:{state.euroToBTC} <br></br>
        BTC to GBP:{state.BTCtoGBP} <br></br>
        BTC to USD:{state.BTCtoUSD} <br></br>
        BTC to EURO:{state.BTCtoEURO} <br></br>
        converted:{converted} <br></br>
        currencyType: {state.currencyType}
      </label> */}
    </div>
  );
};

export default Converter;
