import React from "react";
import "./App.css";
import { Game } from "./components/game";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Conway's Game Of Life</p>
        <div>
          <Game />
        </div>
      </header>
    </div>
  );
}

export default App;
