import React, { Component } from 'react';
import MediumEditor from 'medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import { connect } from 'react-redux';
import { actions } from '../../../store';
import { readFile } from '../../../utils/files';
import styles from './style.sass';

const mapDispatchToProps = {
  uploadPicture: actions.api.uploadPicture,
};

function insertImage({ e, url }) {
  const img = document.createElement('img');
  img.setAttribute('src', url);
  e.target.parentNode.insertBefore(img, e.target.nextElementSibling);
}

function loadImage(url) {
  return new Promise((res) => {
    const img = new Image();
    img.onload = () => res(img);
    img.src = url;
  });
}

async function resizeInCanvas(imgURL) {
  const img = await loadImage(imgURL);
  const perferedWidth = 2400;
  const ratio = perferedWidth / img.width;
  const canvas = document.createElement('canvas');
  canvas.width = img.width * ratio;
  canvas.height = img.height * ratio;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return new Promise((res) => {
    canvas.toBlob(blob => res(blob), 'image/jpeg', 1);
  });
}

class Editor extends Component {
  componentDidMount() {
    const { uploadPicture } = this.props;
    const editor = new MediumEditor(this._container, {
      paste: {
        forcePlainText: false,
      },
      toolbar: {
        buttons: [
          'bold', 'italic', 'underline',
          'h1', 'h2', 'h3',
          'image',
          'justifyLeft', 'justifyCenter', 'quote',
        ],
      },
    });

    editor.subscribe('editablePaste', async (e) => {
      const items = (event.clipboardData || event.originalEvent.clipboardData).items;
      for (const index in items) {
        const item = items[index];
        if (item.kind === 'file') {
          const blob = item.getAsFile();
          const { url: originalImageUrl } = await readFile(blob);
          const smallFile = await resizeInCanvas(originalImageUrl);

          const form = new FormData();
          form.append('image', smallFile);

          uploadPicture({
            form,
            cb: ({ url }) => insertImage({ e, url }),
          });
        }
      }
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
        ref={node => this._container = node}
      >
        {html}
      </textarea>
    );
  }
}

export default connect(null, mapDispatchToProps)(Editor);
