import { closest_colour, rgb_to_hsl } from "ntc-rs";

function placeMouseBox(e: MouseEvent) {
  let mouseBox = document.getElementById("mouse-box");
  if (mouseBox?.style) {
    mouseBox.style.top = e.offsetY + "px";
    mouseBox.style.left = e.clientX + "px";
  }
}

async function getMedia(constraints: MediaStreamConstraints) {
  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    let video = document.getElementById("video") as HTMLVideoElement;
    video.srcObject = stream;
    video.onloadedmetadata = (e) => video.play();
    video.addEventListener("mousemove", (e) => {
      placeMouseBox(e);
      processVideoClick(e, video);
    });
  } catch (error: any) {
    console.log(error.name + ": " + error.message);
  }
}

function processVideoClick(e: MouseEvent, video: HTMLVideoElement) {
  let canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  let canvasCtx = canvas.getContext("2d");
  canvasCtx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  const x = (video.videoWidth / video.clientWidth) * e.offsetX;
  const y = (video.videoHeight / video.clientHeight) * e.offsetY;
  let pixel = canvasCtx?.getImageData(x, y, 1, 1).data;

  paintAppBackground(pixel);

  let output = document.getElementById("pixel-pos");
  if (output && pixel) {
    const [r, g, b] = pixel;
    const rgb = new Int32Array([r, g, b]);
    const [h, s, l] = rgb_to_hsl(rgb);
    output.innerText = `r:${r} g:${g} b:${b}\n h:${h} s:${s} l:${l}  \noffsetX:${e.offsetX}, offsetY:${e.offsetY} \nvideoWidth:${video.videoWidth} videoHeight:${video.videoHeight}`;
    const approxColour = closest_colour(rgb);
    if (approxColour) {
      let lightness = "";
      if (l > 0 && l < 255 / 3) {
        lightness = "Dark ";
      } else if (l > (2 * 255) / 3 && l <= 255) {
        lightness = "Light ";
      }
      lightness =
        approxColour.shade.trim().toLowerCase() != "white" ||
          approxColour.shade.trim().toLowerCase() != "black"
          ? lightness
          : "";
      output.innerText += `\ncolour name: ${approxColour.name}\nshade: ${lightness + approxColour.shade
        }`;
    }
  }
}

window.onload = (e: Event) => {
  getMedia({ video: true });
};

function paintAppBackground(pixelData: Uint8ClampedArray | undefined) {
  if (pixelData) {
    let app = document.getElementById("app");
    const [r, g, b, a] = pixelData;
    app?.setAttribute("style", `background-color: rgba(${r},${g},${b},${a});`);
  }
}
