import React, { Component } from "react";
import RPT from "prop-types";

import { connect } from "react-redux";

import Pictures from "../../ui/pictures";
import Modal from "react-modal";
import Input from "../../elements/input";
import ComplexSelect from "../../elements/complexSelect";
import Form from "../../elements/form";
import Button from "../../elements/button";

import { actions, selectors } from "../../../store";

const mapStateToProps = (state, props) => {
  const { isPending } = selectors.api.updateTag(state, { id: props.tag.id });
  return {
    isPending
  };
};

const mapDispatchToProps = {
  updateTag: actions.api.updateTag
};

class TagForm extends Component {
  static propTypes = {
    tag: RPT.shape({
      id: RPT.number,
      name: RPT.string,
      cover: RPT.string,
      relatedTags: RPT.array
    }).isRequired,
    tags: RPT.array,
    params: RPT.object,

    isPending: RPT.bool,
    updateTag: RPT.func
  };

  state = {
    cover: this.props.tag.cover || "",
    isModalOpen: false
  };

  saveTag = form => {
    const {
      updateTag,
      tag: { id }
    } = this.props;
    updateTag({ form, id });
  };

  handleChange = event => {
    this.setState({ cover: event.target.value });
  };

  getParams() {
    const {
      params,
      tag: { id }
    } = this.props;

    if (!params.tags) {
      return Object.assign({}, params, {
        tags: [id]
      });
    }

    return params;
  }

  renderModal() {
    const { isModalOpen } = this.state;
    const self = this;

    function PictureComponent({ picture }) {
      return (
        <div
          onClick={() =>
            self.setState({ cover: picture.small_url, isModalOpen: false })
          }
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
        <Pictures
          params={this.getParams()}
          PictureComponent={PictureComponent}
        />
      </Modal>
    );
  }

  render() {
    const { cover } = this.state;
    const { tag, tags, isPending } = this.props;
    return (
      <Form name={"tag_form"} onSubmit={this.saveTag}>
        <Input name={"name"} defaultValue={tag.name} label={tag.name} />
        <div>{"Contains subcategories:"}</div>
        <ComplexSelect
          multiple
          name={"tags"}
          options={tags}
          value={tag.relatedTags}
        />
        {this.renderModal()}
        <Button
          style={{ padding: "5px", fontSize: "80%" }}
          onClick={() => this.setState({ isModalOpen: true })}
        >
          {"Choose from picture"}
        </Button>
        <Input
          onChange={this.handleChange}
          name={"cover"}
          label={"Image"}
          value={cover}
        />
        {cover && <img src={cover} style={{ width: "100%" }} />}
        <Button loading={isPending} type={"submit"}>
          {"Save tag"}
        </Button>
      </Form>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TagForm);
