import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("fills in the cards for Major Arcana", () => {
  const { getByDisplayValue } = render(<App />);
  chooseArcana(getByDisplayValue, "Major Arcana");
  const card = getByDisplayValue("-- what value? --");
  expect(card).toMatchSnapshot();
});

test("fills in the cards for suits", () => {
  const { getByDisplayValue } = render(<App />);
  chooseArcana(getByDisplayValue, "Swords");
  const card = getByDisplayValue("-- what value? --");
  expect(card).toMatchSnapshot();
});

// test("uses the given card predictions", () => {
//   // mock major-arcana.js, check the magician gets called
//   const { getByDisplayValue } = render(<App />);
//   chooseArcana(getByDisplayValue, "Major Arcana");
//   const card = getByDisplayValue("-- what value? --");
//   fireEvent.change(card, { target: { value: "The Magician" } });
// });

function chooseArcana(getByDisplayValue, option) {
  const majorMinor = getByDisplayValue("-- major or minor? --");
  expect(majorMinor).toBeInTheDocument();
  fireEvent.change(majorMinor, { target: { value: option } });

  return majorMinor;
}
