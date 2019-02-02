export async function resizeInCanvas(imgURL) {
  const img = await loadImage(imgURL);
  const perferedWidth = 2400;
  const ratio = perferedWidth / img.width;
  const canvas = document.createElement("canvas");
  canvas.width = img.width * ratio;
  canvas.height = img.height * ratio;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return new Promise(res => {
    canvas.toBlob(blob => res(blob), "image/jpeg", 1);
  });
}

function loadImage(url) {
  return new Promise(res => {
    const img = new Image();
    img.onload = () => res(img);
    img.src = url;
  });
}
