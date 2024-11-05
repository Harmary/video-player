import { createMachine } from "xstate";

const videoPlayerMachine = createMachine({
  id: "videoPlayer",
  type: "parallel",
  states: {
    visibility: {
      initial: "normal",
      states: {
        normal: {
          on: { MINIMIZE: "minimized" },
        },
        minimized: {
          on: { MAXIMIZE: "normal" },
        },
      },
    },
    playback: {
      initial: "paused",
      states: {
        paused: {
          on: { PLAY: "playing" },
        },
        playing: {
          on: { PAUSE: "paused" },
        },
      },
    },
    control: {
      initial: "closed",
      states: {
        closed: {
          on: { OPEN: "open" },
        },
        open: {
          on: { CLOSE: "closed" },
        },
      },
    },
  },
});

export default videoPlayerMachine;
