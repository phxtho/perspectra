import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import Cursor from "../cursor/cursor";
import "./video.css";

interface VideoProps {
  onMouseMove?: (averageRGBA: number[]) => void;
  onClick?: (averageRGBA: number[]) => void;
  radius?: number;
}

async function setupVideo(videoEl: HTMLVideoElement) {
  try {
    const cameraStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    });
    videoEl.srcObject = cameraStream;
    videoEl.onloadedmetadata = () => videoEl.play();
  } catch (error: any) {
    console.log(error.name + ": " + error.message);
  }
}

const getColourFromVideo = (
  e: React.MouseEvent<HTMLVideoElement, MouseEvent>,
  canvas: HTMLCanvasElement,
  radius: number = 4
): number[] => {
  return averageRGBA(extractRGBA(e, canvas, radius));
};

const extractRGBA = (
  e: React.MouseEvent<HTMLVideoElement, MouseEvent>,
  canvas: HTMLCanvasElement,
  radius: number = 4
): Uint8ClampedArray => {
  if (e.target instanceof HTMLVideoElement) {
    // pull pixel data from video element
    const video = e.target;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    let canvasCtx = canvas.getContext("2d");
    canvasCtx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    const x = (video.videoWidth / video.clientWidth) * e.nativeEvent.offsetX;
    const y = (video.videoHeight / video.clientHeight) * e.nativeEvent.offsetY;
    const data = canvasCtx?.getImageData(x, y, radius, radius).data;
    if (data) return data;
  }
  return new Uint8ClampedArray();
};

const averageRGBA = (imageData: Uint8ClampedArray): number[] => {
  let average = [0, 0, 0, 0];

  for (let i = 0; i < imageData.length; i += 4) {
    for (let j = 0; j < 4; j++) {
      average[j] += imageData[i + j];
    }
  }
  return average.map((value) => value / (imageData.length / 4));
};

const getMousePosition = (
  e: React.MouseEvent<HTMLVideoElement, MouseEvent>
): [number, number] => {
  if (e.target instanceof HTMLVideoElement) {
    const x = e.pageX;
    const y = e.pageY;
    return [x, y];
  }
  return [0, 0];
};

const Video: FunctionComponent<VideoProps> = ({
  onClick,
  onMouseMove,
  radius = 15,
}) => {
  const videoEl = useRef<HTMLVideoElement>(null);
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const [[x, y], setMousePosition] = React.useState<[number, number]>([0, 0]);
  const [averageRGBA, setAverageRGBA] = useState<number[]>();
  useEffect(() => {
    if (videoEl.current) {
      setupVideo(videoEl.current);
    }
  }, []);
  return (
    <div id="video-container" className="video-container">
      <canvas ref={canvasEl} />
      <video
        id="video"
        ref={videoEl}
        onMouseMove={(e) => {
          const colour = getColourFromVideo(e, canvasEl.current!, radius);
          setAverageRGBA(colour);
          onMouseMove?.(colour);
          setMousePosition(getMousePosition(e));
        }}
        onClick={(e) =>
          onClick?.(getColourFromVideo(e, canvasEl.current!, radius))
        }
      ></video>
      <Cursor radius={radius} x={x} y={y} colour={averageRGBA} />
    </div>
  );
};

export default Video;
