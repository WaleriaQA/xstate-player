import { useRef } from "react";
import { useMachine } from "@xstate/react";
import { playerMachine } from "./playerMachine";


import { Modal } from "antd";

import "./App.css";

function App() {
  const [state, send] = useMachine(playerMachine);
  const videoRef = useRef(null); 

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
          <video ref={videoRef} width="100%" height="450" controls>
            <source src="https://media.pixverse.ai/pixverse%2Fmp4%2Fmedia%2Fweb%2Fori%2F95fd903b-381e-4dc3-b8c6-68edc898211a_seed1904368743.mp4" />
          </video>

          <div className="controls">
            {state.matches({ full: "playing" }) ? (
              <button
  onClick={() => {
    videoRef.current.pause();
    send({ type: "PAUSE" });
  }}
>
                Pause
              </button>
            ) : (
              <button
  onClick={() => {
    videoRef.current.play();
    send({ type: "PLAY" });
  }}
>
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