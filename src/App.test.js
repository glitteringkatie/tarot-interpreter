import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";

test("fills in the cards for Major Arcana", () => {
  const { getByDisplayValue } = render(<App />);
  const majorMinor = getByDisplayValue("-- major or minor? --");
  expect(majorMinor).toBeInTheDocument();
  fireEvent.change(majorMinor, { target: { value: "Major Arcana" } });
  const card = getByDisplayValue("-- what value? --");
  expect(card).toMatchSnapshot();
});

test("fills in the cards for suits", () => {
  const { getByDisplayValue } = render(<App />);
  const majorMinor = getByDisplayValue("-- major or minor? --");
  expect(majorMinor).toBeInTheDocument();
  fireEvent.change(majorMinor, { target: { value: "Swords" } });
  const card = getByDisplayValue("-- what value? --");
  expect(card).toMatchSnapshot();
});

// test("uses the given card predictions", () => {
//   // mock major-arcana.js, check the magician gets called
//   const { getByDisplayValue } = render(<App />);
//   const majorMinor = getByDisplayValue("-- major or minor? --");
//   fireEvent.change(majorMinor, { target: { value: "Major Arcana" } });
//   const card = getByDisplayValue("-- what value? --");
//   fireEvent.change(card, { target: { value: "The Magician" } });
// });
