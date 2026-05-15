import { createMachine, assign } from "xstate";

export const playerMachine = createMachine({
  id: "player",

  context: {
    currentTime: 0,
    muted: false,
  },

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
      initial: "paused",

      states: {
        playing: {
          on: {
            PAUSE: "paused",

            MUTE: {
              actions: assign({
                muted: () => true,
              }),
            },

            UNMUTE: {
              actions: assign({
                muted: () => false,
              }),
            },
          },
        },

        paused: {
          on: {
            PLAY: "playing",

            MUTE: {
              actions: assign({
                muted: () => true,
              }),
            },

            UNMUTE: {
              actions: assign({
                muted: () => false,
              }),
            },
          },
        },
      },

      on: {
        SAVE_TIME: {
          actions: assign({
            currentTime: ({ event }) => event.currentTime,
          }),
        },

        MINIMIZE: "mini",

        CLOSE: "closed",

        "video.ended": {
          target: ".paused",
          actions: assign({
            currentTime: () => 0,
          }),
        },
      },
    },
  },
});