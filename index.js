import init, {rgb_to_hsl, closest_colour_json} from "./dist/ntc/index.js";
init();
async function getMedia(constraints) {
  let stream = null;
  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    let video = document.getElementById("video");
    video.srcObject = stream;
    video.onloadedmetadata = (e) => video.play();
    video.addEventListener("click", (e) => processVideoClick(e, video));
    video.addEventListener("mousemove", (e) => processVideoClick(e, video));
  } catch (error) {
    console.log(error.name + ": " + error.message);
  }
}
function processVideoClick(e, video) {
  let canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  let canvasCtx = canvas.getContext("2d");
  canvasCtx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  const x = video.videoWidth / video.clientWidth * e.offsetX;
  const y = video.videoHeight / video.clientHeight * e.offsetY;
  let pixel = canvasCtx?.getImageData(x, y, 1, 1).data;
  paintAppBackground(pixel);
  let output = document.getElementById("pixel-pos");
  if (output) {
    const [r, g, b] = pixel;
    const rgb = new Int32Array([r, g, b]);
    const [h, s, l] = rgb_to_hsl(rgb);
    output.innerText = `r:${r} g:${g} b:${b}
 h:${h} s:${s} l:${l}  
offsetX:${e.offsetX}, offsetY:${e.offsetY} 
videoWidth:${video.videoWidth} videoHeight:${video.videoHeight}`;
    const approxColour = JSON.parse(closest_colour_json(rgb));
    let lightness = "";
    if (l > 0 && l < 255 / 3) {
      lightness = "Dark ";
    } else if (l > 2 * 255 / 3 && l <= 255) {
      lightness = "Light ";
    }
    lightness = approxColour?.shade?.trim().toLowerCase() != "white" || approxColour?.shade?.trim().toLowerCase() != "black" ? lightness : "";
    output.innerText += `
colour name: ${approxColour?.name}
shade: ${lightness + approxColour?.shade}`;
  }
}
window.onload = (e) => getMedia({video: true});
function paintAppBackground(pixelData) {
  if (pixelData) {
    let app = document.getElementById("app");
    const [r, g, b, a] = pixelData;
    app?.setAttribute("style", `background-color: rgba(${r},${g},${b},${a});`);
  }
}
