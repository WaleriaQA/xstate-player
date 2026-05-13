import { createMachine } from "xstate";

export const playerMachine = createMachine({
  id: "player",

  initial: "closed",

  states: {
    closed: {
      on: {
        OPEN: "full",
      },
    },

    mini: {
      meta: {
        description: "Mini player mode",
      },

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

      meta: {
        description: "Full-screen player",
      },

      on: {
        MINIMIZE: "mini",
        CLOSE: "closed",
        "video.ended": "closed",
      },
    },
  },
});