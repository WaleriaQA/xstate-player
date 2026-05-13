import { useMachine } from "@xstate/react";
import { playerMachine } from "./playerMachine";

import { Modal } from "antd";
import ReactPlayer from "react-player";

import "./App.css";

function App() {
  const [state, send] = useMachine(playerMachine);

  const isFull = state.matches("full");
  const isPlaying = state.matches({ full: "playing" });

  return (
    <div className="app">
      <h1>XState Video Player</h1>

      {/* MINI PLAYER */}

      {state.matches("mini") && (
        <div className="mini-player">
          <button onClick={() => send({ type: "toggle" })}>
            Open Player
          </button>
        </div>
      )}

      {/* FULL PLAYER */}

      <Modal
        open={isFull}
        footer={null}
        onCancel={() => send({ type: "toggle" })}
        width={800}
      >
        <div className="player-wrapper">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            playing={isPlaying}
            controls={true}
            width="100%"
            height="450px"
            onEnded={() => send({ type: "video.ended" })}
          />

          <div className="controls">
            {isPlaying ? (
              <button onClick={() => send({ type: "pause" })}>
                Pause
              </button>
            ) : (
              <button onClick={() => send({ type: "play" })}>
                Play
              </button>
            )}

            <button onClick={() => send({ type: "toggle" })}>
              Minimize
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default App;