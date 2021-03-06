import React, { Component } from "react";
import MediumEditor from "medium-editor";
import "medium-editor/dist/css/medium-editor.css";
import "medium-editor/dist/css/themes/default.css";
import { connect } from "react-redux";
import { actions } from "../../../store";
import { readFile } from "../../../utils/files";
import { resizeInCanvas } from "../../../utils/resize";
import styles from "./style.sass";
import progressStyles from "./progress.sass";

const mapDispatchToProps = {
  uploadPicture: actions.api.uploadPicture,
  uploadGIF: actions.api.uploadGIF
};

function insertImage({ e, url }) {
  const img = document.createElement("img");
  img.setAttribute("src", url);
  e.target.parentNode.insertBefore(img, e.target.nextElementSibling);
}

function createProgressBar() {
  const container = document.createElement("div");
  container.classList.add(progressStyles.meter, progressStyles.animate);

  const innerSpan = document.createElement("span");
  innerSpan.style.width = "100%";
  const stripes = document.createElement("span");

  innerSpan.appendChild(stripes);
  container.appendChild(innerSpan);

  return container;
}

class Editor extends Component {
  componentDidMount() {
    const { uploadPicture, uploadGIF } = this.props;
    const editor = new MediumEditor(this._container, {
      paste: {
        forcePlainText: false
      },
      toolbar: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "anchor",
          "h1",
          "h2",
          "h3",
          "image",
          "justifyLeft",
          "justifyCenter",
          "quote"
        ]
      }
    });

    editor.subscribe("editablePaste", async e => {
      const items = (event.clipboardData || event.originalEvent.clipboardData)
        .items;

      const filesArray = [];

      for (const index in items) {
        const item = items[index];
        if (item.kind === "file") {
          filesArray.push({
            blob: item.getAsFile(),
            type: item.type === "image/gif" ? "gif" : "image"
          });
        }
      }

      filesArray.reduce(
        (promise, { blob, type }) =>
          promise.then(async () => {
            if (type === "image") {
              const { url: originalImageUrl } = await readFile(blob);
              const smallFile = await resizeInCanvas(originalImageUrl);

              const form = new FormData();
              form.append("image", smallFile);

              const progress = createProgressBar();
              e.target.parentNode.insertBefore(
                progress,
                e.target.nextElementSibling
              );

              uploadPicture({
                form,
                cb: ({ url }) => {
                  const img = document.createElement("img");
                  img.setAttribute("src", url);
                  progress.parentElement.replaceChild(img, progress);
                }
              });
            } else if (type === "gif") {
              const progress = createProgressBar();
              e.target.parentNode.insertBefore(
                progress,
                e.target.nextElementSibling
              );
              const form = new FormData();
              form.append("gif", blob);
              uploadGIF({
                form,
                cb: ({ url }) => {
                  const img = document.createElement("img");
                  img.setAttribute("src", url);
                  img.setAttribute("data-type", "gif");
                  progress.parentElement.replaceChild(img, progress);
                }
              });
            }
          }),
        Promise.resolve()
      );
    });

    editor.subscribe("editableDrop", async function(event) {
      var dt = event.dataTransfer;
      var items = dt.items;

      const filesArray = [];

      for (const index in items) {
        const item = items[index];
        if (item.kind === "file") {
          filesArray.push({
            blob: item.getAsFile(),
            type: item.type === "image/gif" ? "gif" : "image"
          });
        }
      }

      // wait .5 second, so that editor can render all dropped images
      await new Promise(resolve => setTimeout(resolve, 500));

      const images = await Promise.all(
        filesArray.map(({ blob, type }) =>
          readFile(blob).then(({ url: originalImageUrl }) => {
            const img = document.querySelectorAll(
              `[src="${originalImageUrl}"]`
            );

            const imgElement = img && img[0];
            if (imgElement) {
              imgElement.style.display = "none";
            }

            return { originalImageUrl, imgElement, type, blob };
          })
        )
      );

      images.reduce((promise, { originalImageUrl, imgElement, type, blob }) => {
        return promise.then(async () => {
          const progress = createProgressBar();

          if (imgElement) {
            imgElement.parentElement.insertBefore(progress, imgElement);
            imgElement.style.display = "none";
          }

          if (type === "image") {
            const smallFile = await resizeInCanvas(originalImageUrl);

            const form = new FormData();
            form.append("image", smallFile);

            await uploadPicture({
              form,
              cb: ({ url }) => {
                progress.parentElement.removeChild(progress);

                if (imgElement) {
                  imgElement.style.display = "";
                  imgElement.src = url;
                } else {
                  // try to find this element once again
                  const img = document.querySelectorAll(
                    `[src="${originalImageUrl}"]`
                  );

                  const foundImgElement = img && img[0];

                  if (foundImgElement) {
                    foundImgElement.src = url;
                  }
                }
              }
            });
          } else if (type === "gif") {
            console.log(blob);
            const form = new FormData();
            form.append("gif", blob);
            await uploadGIF({
              form,
              cb: ({ url }) => {
                progress.parentElement.removeChild(progress);

                if (imgElement) {
                  imgElement.style.display = "";
                  imgElement.setAttribute("data-type", "gif");
                  imgElement.src = url;
                } else {
                  // try to find this element once again
                  const img = document.querySelectorAll(
                    `[src="${originalImageUrl}"]`
                  );

                  const foundImgElement = img && img[0];

                  if (foundImgElement) {
                    foundImgElement.setAttribute("data-type", "gif");
                    foundImgElement.src = url;
                  }
                }
              }
            });
          }
        });
      }, Promise.resolve());
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { html, name } = this.props;
    return (
      <textarea
        name={name}
        className={styles.container}
        ref={node => (this._container = node)}
        defaultValue={html}
      />
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Editor);
