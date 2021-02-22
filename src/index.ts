async function getMedia(constraints: MediaStreamConstraints) {
  let stream = null;

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    let video = document.getElementById("video") as HTMLVideoElement;
    video.srcObject = stream;
    video.onloadedmetadata = (e) => video.play();
    video.addEventListener("click", (e) => processVideoClick(e, video));
    video.addEventListener("mousemove", (e) => {
      let output = document.getElementById("mouse-pos");
      if (output)
        output.innerText = `clientX:${e.clientX} , clientY: ${e.clientX}
        offsetX:${e.offsetX}, offsetY:${e.offsetY}`;
    });
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
  document.getElementById("app")?.append(canvas);
  let pixel = canvasCtx?.getImageData(e.offsetX, e.offsetX, 1, 1).data;

  let output = document.getElementById("pixel-pos");
  if (output)
    output.innerText = `r:${pixel?.[0]} g:${pixel?.[1]} b:${pixel?.[2]} \noffsetX:${e.offsetX}, offsetY:${e.offsetY} \nvideoWidth:${video.videoWidth} videoHeight:${video.videoHeight}`;
}

window.onload = (e: Event) => getMedia({ video: true });
