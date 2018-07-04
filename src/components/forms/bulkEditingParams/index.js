import React, { Component } from "react";
import RPT from "prop-types";

import { connect } from "react-redux";
import { actions, selectors } from "../../../store";

import ComplexSelect from "../../elements/complexSelect";
import Input from "../../elements/input";

import styles from "./style.sass";

const mapStateToProps = state => ({
  tags: selectors.api.tags(state)
});

const mapDispatchToProps = {
  fetchTags: actions.api.tags,
  updateParam: actions.bulk.editing.params
};

class BulkEditingParamsForm extends Component {
  static propTypes = {
    tags: RPT.object,

    fetchTags: RPT.func,
    updateParam: RPT.func
  };

  componentDidMount() {
    this.props.fetchTags();
  }

  updateParam(type, value) {
    const { updateParam } = this.props;
    if (type === "tags") {
      updateParam({ type, value });
    } else {
      updateParam({ type, value: value.target.value });
    }
  }

  render() {
    const {
      tags: { data }
    } = this.props;

    const tagOptions = (data || []).map(tag => {
      return {
        value: tag.id,
        label: tag.name.toLowerCase()
      };
    });

    return (
      <div className={styles.container}>
        <h3>{"Params to add for all selected pictures"}</h3>
        {"This tags will be added to all selected pictures"}
        <ComplexSelect
          onChange={this.updateParam.bind(this, "tags")}
          multiple
          name={"tags"}
          options={tagOptions}
          value={[]}
        />
        <Input
          label={"Location"}
          type={"text"}
          name={"location"}
          onChange={this.updateParam.bind(this, "location")}
        />
        <Input
          label={"Keywords"}
          type={"text"}
          name={"keywords"}
          onChange={this.updateParam.bind(this, "keywords")}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkEditingParamsForm);
