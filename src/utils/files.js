export function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = e => resolve({ url: e.target.result, file });
    reader.readAsDataURL(file);
  });
}
