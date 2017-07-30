import React, { Component } from 'react';
import MediumEditor from 'medium-editor';
import 'medium-editor/dist/css/medium-editor.css';
import 'medium-editor/dist/css/themes/default.css';
import { connect } from 'react-redux';
import { actions } from '../../../store';
import styles from './style.sass';

const mapDispatchToProps = {
  uploadPicture: actions.api.uploadPicture,
};

function insertImage({ e, url }) {
  const img = document.createElement('img');
  img.setAttribute('src', url);
  e.target.parentNode.insertBefore(img, e.target.nextElementSibling);
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
          'justifyLeft', 'justifyCenter', 'quote',
        ],
      },
    });

    editor.subscribe('editablePaste', (e, el) => {
      var items = (event.clipboardData || event.originalEvent.clipboardData).items;
      console.log(e, el)
      for (var index in items) {
        var item = items[index];
        if (item.kind === 'file') {
          var blob = item.getAsFile();
          const form = new FormData();
          form.append('image', blob);
          
          // document.body.appendChild(aaa);
          // editor.addElements(aaa);
          console.log('we are in the end');

          uploadPicture({
            form,
            cb: ({ url }) => {
              console.log(url);
              insertImage({ e, url });
            },
          });
          // send request to create an image remotely...
          
          
          // we don't really care about image here
          // var reader = new FileReader();
          // reader.onload = function(event){
          //   console.log(event.target.result)}; // data url!
          // reader.readAsDataURL(blob);
      }
  }

    })
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
