import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import MajorArcana from "./lib/major-arcana";

function App() {
  const [arcana, setArcana] = useState("-- major or minor? --");
  const [card, setCard] = useState("-- what value? --");
  // if major arcana, second select has major arcana
  // if minor arcana, second select has 1-King

  const chooseArcana = (e) => {
    setCard("-- what value? --");
    setArcana(e.target.value);
  };

  const majorArcana = [
    "The Fool",
    "The Magician",
    "The High Priestess",
    "The Empress",
    "The Emperor",
    "The Hierophant",
    "The Lovers",
    "The Chariot",
    "Strength",
    "The Hermit",
    "Wheel of Fortune",
    "Justic",
    "The Hanged Man",
    "Death",
    "Temperance",
    "The Devil",
    "The Tower",
    "The Star",
    "The Moon",
    "The Sun",
    "Judgement",
    "The World",
  ];

  const suits = [
    "Ace",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Page",
    "Knight",
    "Queen",
    "King",
  ];

  const cards = arcana === "Major Arcana" ? majorArcana : suits;
  const cardOptions = cards.map((c) => {
    return <option>{c}</option>;
  });

  const sentence = MajorArcana.fool.make(
    "Your future contains {{ adjective }} {{ nouns }}."
  );
  return (
    <div className="App">
      <header className="App-header">
        <div className="card-selector">
          What card did you draw?
          <select value={arcana} onChange={chooseArcana}>
            <option disabled>-- major or minor? --</option>
            <option>Major Arcana</option>
            <option>Swords</option>
            <option>Cups</option>
            <option>Wands</option>
            <option>Pentacles</option>
          </select>
          <select value={card} onChange={(e) => setCard(e.target.value)}>
            {[<option disabled>-- what value? --</option>].concat(cardOptions)}
          </select>
        </div>
        <p>{sentence}</p>
      </header>
    </div>
  );
}

export default App;
