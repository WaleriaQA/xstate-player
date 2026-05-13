import { useMachine } from "@xstate/react";
import { playerMachine } from "./playerMachine";

import { Modal } from "antd";
import ReactPlayer from "react-player";

import "./App.css";

function App() {
  const [state, send] = useMachine(playerMachine);

  return (
  <div className="app">
    <h1>XState Video Player</h1>

    {/* OPEN BUTTON */}

    {state.matches("closed") && (
      <button onClick={() => send({ type: "OPEN" })}>
        Open Player
      </button>
    )}

    {/* MINI PLAYER */}

    {state.matches("mini") && (
      <div className="mini-player">
        <p>Mini Player</p>

        <div className="controls">
          <button onClick={() => send({ type: "EXPAND" })}>
            Expand
          </button>

          <button onClick={() => send({ type: "CLOSE" })}>
            Close
          </button>
        </div>
      </div>
    )}

    {/* FULL PLAYER */}

    <Modal
      open={state.matches("full")}
      footer={null}
      onCancel={() => send({ type: "MINIMIZE" })}
      width={800}
    >
      <div className="player-wrapper">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          playing={state.matches({ full: "playing" })}
          controls={true}
          width="100%"
          height="450px"
          onEnded={() => send({ type: "video.ended" })}
        />

        <div className="controls">
          {state.matches({ full: "playing" }) ? (
            <button onClick={() => send({ type: "PAUSE" })}>
              Pause
            </button>
          ) : (
            <button onClick={() => send({ type: "PLAY" })}>
              Play
            </button>
          )}

          <button onClick={() => send({ type: "MINIMIZE" })}>
            Minimize
          </button>

          <button onClick={() => send({ type: "CLOSE" })}>
            Close
          </button>
        </div>
      </div>
    </Modal>
  </div>
);
}

export default App;