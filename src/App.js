import React from "react";
import logo from "./logo.svg";
import "./App.css";
import MajorArcana from "./lib/major-arcana";

function App() {
  const sentence = MajorArcana.fool.make(
    "Your future contains {{ adjective }} {{ nouns }}."
  );
  return (
    <div className="App">
      <header className="App-header">
        <CardSelector></CardSelector>
        <p>{sentence}</p>
      </header>
    </div>
  );
}

class CardSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arcana: "-- major or minor? --",
      card: "-- what value? --",
    };
    this.handleArcana = this.handleArcana.bind(this);
    this.handleCard = this.handleCard.bind(this);
  }

  handleArcana(event) {
    this.setState({ arcana: event.target.value });
  }

  handleCard(event) {
    this.setState({ card: event.target.value });
  }

  render() {
    // if major arcana, second select has major arcana
    // if minor arcana, second select has 1-King

    return (
      <div className="card-selector">
        What card did you draw?
        <select value={this.state.arcana} onChange={this.handleArcana}>
          <option disabled>-- major or minor? --</option>
          <option>Major Arcana</option>
          {/* <option>Swords</option>
          <option>Cups</option>
          <option>Wands</option>
          <option>Pentacles</option> */}
        </select>
        <select value={this.state.card} onChange={this.handleCard}>
          <option disabled>-- what value? --</option>
          <option>The Fool</option>
          <option>The Magician</option>
        </select>
      </div>
    );
  }
}

export default App;
