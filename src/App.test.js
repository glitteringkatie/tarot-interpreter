import React from "react";
import { render, fireEvent } from "@testing-library/react";
import App from "./App";
import MajorArcana from "./lib/major-arcana";
import Sentencer from "sentencer";

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

test("uses the given card predictions", () => {
  const adj = "spiritual";
  const noun = "master";
  const magicianMock = jest.spyOn(MajorArcana, "magician");
  magicianMock.mockImplementation((template) => {
    const mockSentencer = Sentencer.use({
      nounList: [noun],
      adjectiveList: [adj],
    });
    return mockSentencer.make(template);
  });

  const { getByDisplayValue, getByText } = render(<App />);
  chooseArcana(getByDisplayValue, "Major Arcana");
  const card = getByDisplayValue("-- what value? --");
  fireEvent.change(card, { target: { value: "The Magician" } });

  const prediction = getByText(`Your future contains ${adj} ${noun}s.`);
  expect(prediction).toMatchSnapshot;
});

function chooseArcana(getByDisplayValue, option) {
  const majorMinor = getByDisplayValue("-- major or minor? --");
  expect(majorMinor).toBeInTheDocument();
  fireEvent.change(majorMinor, { target: { value: option } });

  return majorMinor;
}
