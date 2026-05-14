import { createMachine } from "xstate";

export const playerMachine = createMachine({
  id: "player",

//   context: {
//     progress: 0,
//     isPlaying: false,
//   },

  initial: "closed",

  states: {
    closed: {
      on: {
        OPEN: "full",
      },
    },

    mini: {
      on: {
        EXPAND: "full",
        CLOSE: "closed",
      },
    },

    
    full: {
  initial: "playing",

  states: {
    playing: {
      on: {
        PAUSE: "paused",
      },
    },

    paused: {
      on: {
        PLAY: "playing",
      },
    },
  },

  on: {
    MINIMIZE: "mini",
    CLOSE: "closed",
    "video.ended": "closed",
  },
}
  },
});