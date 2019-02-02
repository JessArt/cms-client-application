import React from "react";
import { connect } from "react-redux";
import { actions } from "../../../store";
import Input from "../input";
import { readFile } from "../../../utils/files";
import { resizeInCanvas } from "../../../utils/resize";

const mapDispatchToProps = {
  uploadPicture: actions.api.uploadPicture
};

class ImageSelector extends React.Component {
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
  renderHint() {
    return (
      <div>
        {
          "please, paste link to the 1200px version from the website or pick a file "
        }
        <input accept=".png,.jpg" type="file" onChange={this.onChange} />
      </div>
    );
  }
  render() {
    const { label, name, defaultValue } = this.props;
    return (
      <div ref={node => (this.container = node)}>
        <Input
          label={label}
          name={name}
          type={"text"}
          hint={this.renderHint()}
          defaultValue={defaultValue}
        />
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(ImageSelector);
