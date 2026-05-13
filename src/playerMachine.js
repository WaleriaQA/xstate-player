import { createMachine } from "xstate";

export const playerMachine = createMachine({
  id: "player",
  initial: "mini",

  states: {
    mini: {
      meta: {
        description: "Meow Meow",
      },
      on: {
        toggle: "full",
      },
    },

    full: {
      initial: "playing",

      states: {
        playing: {
          entry: "playVideo",
          on: {
            pause: "paused",
          },
        },

        paused: {
          entry: "pauseVideo",
          on: {
            play: "playing",
          },
        },
      },

      meta: {
        description: "The full-screen video",
      },

      exit: "stopVideo",

      on: {
        toggle: "mini",
        "key.escape": "mini",
        "video.ended": "mini",
      },
    },
  },
},
{
  actions: {
    playVideo: () => {
      // В React мы потом вызовем video.play() через ref
    },

    pauseVideo: () => {
      // В React через ref
    },

    stopVideo: () => {
      // В React через ref
    },
  },
});