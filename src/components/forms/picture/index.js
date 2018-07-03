import React, { Component } from "react";
import RPT from "prop-types";
import { connect } from "react-redux";
import Button from "../../elements/button";
import Form from "../../elements/form";
import Input from "../../elements/input";
import Select from "../../elements/select";
import ComplexSelect from "../../elements/complexSelect";
import Option from "../../elements/option";
import FixedControls from "../../ui/fixedControls";
import ConfirmationModal from "../../ui/confirmationModal";
import { actions, selectors } from "../../../store";
import styles from "./style.sass";
import { preparePictureForm } from "../../../utils/forms";
import { readFile } from "../../../utils/files";

const mapStateToProps = (state, props) => {
  const id = props.picture.id;
  const { isPending, error, data } = selectors.api.savePicture(
    state,
    props.picture
  );
  const { data: tags } = selectors.api.tags(state);
  const imageTags = id && selectors.api.imageTags(state, { id }).data;
  return {
    isPending,
    error,
    data,
    tags,
    imageTags
  };
};

const mapDispatchToProps = {
  save: actions.api.savePictureWithNotification,
  deletePicture: actions.api.deletePictureWithRedirect
};

class PictureForm extends Component {
  static propTypes = {
    picture: RPT.object,
    small: RPT.bool,
    save: RPT.func,
    isPending: RPT.bool,
    error: RPT.object,
    data: RPT.object,
    callback: RPT.func,
    defaults: RPT.object,
    deletePicture: RPT.func
  };

  static defaultProps = {
    defaults: {}
  };

  state = {
    url: null
  };

  submitForm = form => {
    const { picture, save, callback } = this.props;
    const updatedForm = preparePictureForm({ form, picture });
    const promise = save({ ...picture, form: updatedForm });

    if (callback) {
      promise.then(callback);
    }
  };

  imageUpload = e => {
    const file = e.target.files[0];
    readFile(file).then(({ url }) => this.setState({ url }));
  };

  deleteImage = () => {
    const { picture, deletePicture } = this.props;
    deletePicture(picture);
  };

  renderImage() {
    const { url } = this.state;
    const { picture, small } = this.props;

    if (url) {
      return <img className={styles.bigImage} src={url} />;
    }

    if (picture.small_url) {
      return <img className={styles.bigImage} src={picture.small_url} />;
    }

    if (small) {
      return <img className={styles.image} src={picture.url} />;
    }

    return null;
  }

  renderOverlay() {
    const { small, isPending, error, data } = this.props;

    if (small && (isPending || error || data)) {
      return (
        <div className={styles.overlay}>
          {isPending && "Uploading..."}
          {error && "Error during uploading :("}
          {data && "Uploaded successfully!"}
        </div>
      );
    }
  }

  render() {
    const { picture, small, isPending, tags, imageTags, defaults } = this.props;
    const submitButton = (
      <Button loading={isPending} type={"submit"}>
        {"Save picture"}
      </Button>
    );

    const deleteButton = picture && (
      <ConfirmationModal
        onConfirm={this.deleteImage}
        text={`You are about to delete an image: ${picture.title}`}
      >
        {({ open }) => (
          <Button style={"danger"} loading={false} onClick={open}>
            {"Delete"}
          </Button>
        )}
      </ConfirmationModal>
    );

    const submitMarkup = small ? null : (
      <FixedControls>
        <div className={styles.buttons}>
          <div className={styles.buttonWrapper}>{submitButton}</div>
          <div className={styles.buttonWrapper}>{deleteButton}</div>
        </div>
      </FixedControls>
    );

    const tagValue = defaults.tags
      ? defaults.tags.map(({ value }) => value)
      : [];
    const tagOptions = (tags || [])
      .map(tag => {
        if (imageTags && imageTags[tag.id]) {
          tagValue.push(tag.id);
        }

        return {
          value: tag.id,
          label: tag.name.toLowerCase()
        };
      })
      .concat(defaults.tags ? defaults.tags : []);

    return (
      <Form
        name={"pictureForm"}
        onSubmit={this.submitForm}
        className={styles.form}
      >
        {this.renderOverlay()}
        {picture.id && (
          <div className={styles.externalContainer}>
            <a
              className={styles.externalLink}
              href={`https://jess.gallery/media/${picture.id}?type=${
                picture.type
              }`}
              target={"_blank"}
            >
              {"This picture in the jess.gallery website"}
            </a>
          </div>
        )}
        {this.renderImage()}
        {picture.id && (
          <Input type={"file"} name={"image"} onChange={this.imageUpload} />
        )}
        {picture.id && (
          <Input name={"id"} type={"hidden"} defaultValue={picture.id} />
        )}
        {picture.fakeId && (
          <Input
            name={"fakeId"}
            type={"hidden"}
            defaultValue={picture.fakeId}
          />
        )}
        <Input
          label={"Title"}
          type={"text"}
          name={"title"}
          defaultValue={picture.title}
        />
        <Select name={"type"}>
          <Option id={"photo"} selected={picture.type === "photo"}>
            Photo
          </Option>
          <Option id={"art"} selected={picture.type === "art"}>
            Art
          </Option>
          <Option id={"craft"} selected={picture.type === "craft"}>
            Craft
          </Option>
          <Option id={"postcard"} selected={picture.type === "postcard"}>
            postcards
          </Option>
          <Option id={"other"} selected={picture.type === "other"}>
            Other (will not appear anywhere)
          </Option>
        </Select>
        <ComplexSelect
          multiple
          name={"tags"}
          options={tagOptions}
          value={tagValue}
        />
        <Input
          name={"description"}
          label={"Description"}
          defaultValue={picture.description}
        />
        {!small && (
          <Input
            name={"metaTitle"}
            label={"Meta Title"}
            hint={
              "For SEO. Should be at maximum 55 symbols, will appear as the first line when share; the main search comparison in google. The most important words should come first"
            }
            type={"text"}
            defaultValue={picture.meta_title}
          />
        )}
        {!small && (
          <Input
            name={"metaDescription"}
            label={"Meta Description"}
            hint={
              "For SEO. Should be an engaging sentence, with at maximum 150 symbols (more important words first). Will appear as the second line when share."
            }
            type={"text"}
            defaultValue={picture.meta_description}
          />
        )}
        <Input
          name={"keywords"}
          label={"Keywords"}
          hint={
            "For SEO. Should be words (or 2–3 words, but better smaller), separated by commas, up to 8. For instance: jess zaikova, art, acryl, dog, painted dog, acryl dog paint"
          }
          type={"text"}
          defaultValue={defaults.keywords || picture.keywords}
        />
        <Input
          name={"date"}
          label={"Date"}
          placeholder={"YYYY | YYYY-MM | YYYY-MM-DD"}
          type={"text"}
          defaultValue={defaults.date || picture.date}
        />
        <Input
          name={"location"}
          label={"Location"}
          placeholder={"In plain english"}
          type={"location"}
          defaultValue={defaults.location || picture.location}
        />
        {submitMarkup}
      </Form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PictureForm);
