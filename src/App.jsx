import { useRef, useEffect } from "react";
import { useMachine } from "@xstate/react";
import { playerMachine } from "./playerMachine";


import { Modal } from "antd";

import "./App.css";

function App() {
  const [state, send] = useMachine(playerMachine);
  const videoRef = useRef(null); 

  useEffect(() => {
  if (videoRef.current) {
    videoRef.current.currentTime = state.context.currentTime;
  }
}, [state.context.currentTime]);

useEffect(() => {
  if (!videoRef.current) return;

  videoRef.current.muted = state.context.muted;
}, [state.context.muted]);

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
      className="custom-modal"
      rootClassName="custom-modal"
        open={state.matches("full")}
        footer={null}
        onCancel={() => send({ type: "MINIMIZE" })}
        width={800}
      >
        <div className="player-wrapper">
          <video 
          ref={videoRef} 
          width="100%" 
          height="450" 
          controls
          onEnded={() => send({ type: "video.ended" })}
          onPlay={() => send({ type: "PLAY" })}
onPause={() => send({ type: "PAUSE" })}
          >
            <source src="https://www.w3schools.com/html/mov_bbb.mp4" />
          </video>

          <div className="controls">
            {state.matches({ full: "playing" }) ? (
              <button
  onClick={() => {
     videoRef.current.pause();

  send({
    type: "SAVE_TIME",
    currentTime: videoRef.current.currentTime,
  });

  send({ type: "PAUSE" });
  }}
>
                Pause
              </button>
            ) : (
              <button className="play-btn"
  onClick={() => {
    videoRef.current?.play();
    send({ type: "PLAY" });
  }}
>
                Play
              </button>
            )}

            {state.context.muted ? (
    <button
      onClick={() => {
        
        send({ type: "UNMUTE" });
      }}
    >
      Unmute
    </button>
  ) : (
    <button
      onClick={() => {
        
        send({ type: "MUTE" });
      }}
    >
      Mute
    </button>
  )}

            <button
  onClick={() => {
    send({
      type: "SAVE_TIME",
      currentTime: videoRef.current.currentTime,
    });

    videoRef.current?.pause(); 

    send({ type: "MINIMIZE" });
  }}
>
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