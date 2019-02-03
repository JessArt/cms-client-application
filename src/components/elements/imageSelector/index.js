import React from "react";
import { connect } from "react-redux";
import { actions } from "../../../store";
import Input from "../input";
import { readFile } from "../../../utils/files";
import { resizeInCanvas } from "../../../utils/resize";
import Modal from "react-modal";
import Pictures from "../../ui/pictures";
import { withRouter } from "react-router";
import { parse } from "query-string";

import styles from "./style.sass";

const mapDispatchToProps = {
  uploadPicture: actions.api.uploadPicture
};

class ImageSelector extends React.Component {
  state = {
    isModalOpen: false
  };
  onChange = async e => {
    const { name, uploadPicture } = this.props;
    const imageInput = this.container.querySelector(`input[name="${name}"]`);

    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      const { url: originalImageUrl } = await readFile(file);
      const smallFile = await resizeInCanvas(originalImageUrl);

      imageInput.value = "uploading...";

      const form = new FormData();
      form.append("image", smallFile);

      uploadPicture({
        form,
        cb: ({ url }) => {
          imageInput.value = url;
        }
      });
    }
  };
  renderModal() {
    const {
      name,
      onChange,
      location: { search }
    } = this.props;
    const { isModalOpen } = this.state;
    const self = this;

    function PictureComponent({ picture }) {
      return (
        <div
          onClick={() => {
            if (onChange) {
              onChange(picture.big_url);
            } else {
              const imageInput = self.container.querySelector(
                `input[name="${name}"]`
              );
              imageInput.value = picture.big_url;
            }

            self.setState({ isModalOpen: false });
          }}
        >
          <img src={picture.small_url} style={{ height: "150px" }} />
        </div>
      );
    }
    return (
      <Modal
        isOpen={isModalOpen}
        style={{ overlay: { zIndex: 11 } }}
        onRequestClose={() => this.setState({ isModalOpen: false })}
        contentLabel="Example Modal"
      >
        <Pictures params={parse(search)} PictureComponent={PictureComponent} />
      </Modal>
    );
  }
  renderHint() {
    return (
      <div>
        <span
          className={styles.chooseLink}
          onClick={() => this.setState({ isModalOpen: true })}
        >
          choose from pictures
        </span>
        {
          " or paste link to the 1200px version from the website or pick a file "
        }
        <input
          className={styles.chooseFile}
          accept=".png,.jpg"
          type="file"
          onChange={this.onChange}
        />
      </div>
    );
  }
  render() {
    const { label, name, defaultValue, onChange, value } = this.props;
    return (
      <div ref={node => (this.container = node)}>
        {this.renderModal()}
        <Input
          onChange={e => {
            if (onChange) {
              onChange(e.target.value);
            }
          }}
          label={label}
          name={name}
          type={"text"}
          hint={this.renderHint()}
          defaultValue={defaultValue}
          value={value}
        />
      </div>
    );
  }
}

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ImageSelector)
);
