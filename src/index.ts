async function getMedia(constraints: MediaStreamConstraints) {
  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    let video = document.getElementById("video") as HTMLVideoElement;
    video.srcObject = stream;
    video.onloadedmetadata = (e) => video.play();
    video.addEventListener("click", (e) => processVideoClick(e, video));
    video.addEventListener("mousemove", (e) => processVideoClick(e, video));
  } catch (error) {
    console.log(error.name + ": " + error.message);
  }
}

function processVideoClick(e: MouseEvent, video: HTMLVideoElement) {
  let canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  let canvasCtx = canvas.getContext("2d");
  canvasCtx?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
  let pixel = canvasCtx?.getImageData(e.offsetX, e.offsetY, 1, 1).data;

  paintAppBackground(pixel);

  let output = document.getElementById("pixel-pos");
  if (output) {
    const [r, g, b, a] = pixel;
    output.innerText = `r:${r} g:${g} b:${b} \noffsetX:${e.offsetX}, offsetY:${e.offsetY} \nvideoWidth:${video.videoWidth} videoHeight:${video.videoHeight}`;
  }
}

window.onload = (e: Event) => getMedia({ video: true });

function paintAppBackground(pixelData: Uint8ClampedArray | undefined) {
  if (pixelData) {
    let app = document.getElementById("app");
    const [r, g, b, a] = pixelData;
    app?.setAttribute("style", `background-color: rgba(${r},${g},${b},${a});`);
  }
}
