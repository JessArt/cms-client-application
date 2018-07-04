import React, { Component } from "react";
import RPT from "prop-types";

import { connect } from "react-redux";
import { selectors, actions } from "../../../store";

import Form from "../../elements/form";
import ComplexSelect from "../../elements/complexSelect";
import Button from "../../elements/button";

import styles from "./style.sass";

const mapStateToProps = (state, { type }) => ({
  isPending: selectors.api.updateTopTags(state, { type }).isPending
});

const mapDispatchToProps = {
  updateTopTags: actions.api.updateTopTags
};

class TopTagsForm extends Component {
  static propTypes = {
    tags: RPT.array,
    topTags: RPT.array,
    type: RPT.oneOf(["photo", "art"]),

    isPending: RPT.bool,
    updateTopTags: RPT.func
  };

  updateTopTags = form => {
    const { type, updateTopTags } = this.props;
    updateTopTags({ form, type });
  };

  render() {
    const { tags, topTags, isPending } = this.props;
    return (
      <Form name={"top_tags"} onSubmit={this.updateTopTags}>
        <ComplexSelect multiple name={"tags"} options={tags} value={topTags} />
        <div className={styles.btnContainer}>
          <Button type={"submit"} loading={isPending}>
            {"Update top tags"}
          </Button>
        </div>
      </Form>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopTagsForm);
