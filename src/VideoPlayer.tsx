import React from "react";

import ReactPlayer from "react-player";
import { Button, Flex, Modal } from "antd";

import { useMachine } from "@xstate/react";
import {
  CompressOutlined,
  ExpandOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";

import cls from "./VideoPlayer.module.css";
import videoPlayerMachine from "./videoPlayerMachine";

const VideoPlayer = () => {
  const [state, send] = useMachine(videoPlayerMachine);

  return (
    <Flex className={cls.content}>
      <Button
        className={cls.openButton}
        color='primary'
        variant='outlined'
        onClick={() => send({ type: "OPEN" })}
      >
        <PlayCircleOutlined className={cls.openButton__icon} />
      </Button>
      <Modal
        title='Player'
        open={state.matches("control.open")}
        onCancel={() => send({ type: "CLOSE" })}
        footer={
          <Flex className={cls.buttonsContainer}>
            <Button
              onClick={() =>
                send(
                  state.matches("visibility.normal")
                    ? { type: "MINIMIZE" }
                    : { type: "MAXIMIZE" }
                )
              }
              icon={
                state.matches("visibility.normal") ? (
                  <ExpandOutlined />
                ) : (
                  <CompressOutlined />
                )
              }
              shape='circle'
            />
            <Button
              onClick={() =>
                send(
                  state.matches("playback.playing")
                    ? { type: "PAUSE" }
                    : { type: "PLAY" }
                )
              }
              shape='circle'
              icon={
                state.matches("playback.playing") ? (
                  <PauseCircleOutlined />
                ) : (
                  <PlayCircleOutlined />
                )
              }
            />
          </Flex>
        }
        width={state.matches("visibility.minimized") ? "60%" : "40%"}
      >
        <ReactPlayer
          url='https://cdn.flowplayer.com/d9cd469f-14fc-4b7b-a7f6-ccbfa755dcb8/hls/383f752a-cbd1-4691-a73f-a4e583391b3d/playlist.m3u8'
          playing={state.matches("playback.playing")}
          width='100%'
          height='100%'
        />
      </Modal>
    </Flex>
  );
};

export default VideoPlayer;
