import { useMachine } from "@xstate/react";
import { playerMachine } from "./playerMachine";

import "./App.css";

function App() {
  const [state, send] = useMachine(playerMachine);

  return (
    <div className="app">
      <h1>XState Video Player</h1>

      <p>Current state: {JSON.stringify(state.value)}</p>

      <button onClick={() => send({ type: "toggle" })}>
        Toggle Player
      </button>

      {state.matches("mini") && (
        <div className="mini-player">
          <p>Mini Player</p>
        </div>
      )}

      {state.matches("full") && (
        <div className="full-player">
          <p>Full Player</p>

          {state.matches({ full: "playing" }) && (
            <button onClick={() => send({ type: "pause" })}>
              Pause
            </button>
          )}

          {state.matches({ full: "paused" }) && (
            <button onClick={() => send({ type: "play" })}>
              Play
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default App;