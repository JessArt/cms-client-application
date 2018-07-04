import React, { Component } from "react";
import RPT from "prop-types";

import { connect } from "react-redux";
import { actions, selectors } from "../../../store";

import Input from "../../elements/input";
import ComplexSelect from "../../elements/complexSelect";

import styles from "./style.sass";

const mapStateToProps = state => ({
  tags: selectors.api.tags(state)
});

const mapDispatchToProps = {
  updateParam: actions.bulk.params
};

class BulkParamsForm extends Component {
  static propTypes = {
    tags: RPT.object,
    updateParam: RPT.func
  };

  updateParam(type, rawValue) {
    let value = rawValue;
    if (type !== "tags") {
      value = rawValue.target.value;
    }
    this.props.updateParam({ type, value });
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
        <h3 className={styles.title}>{"Default values for all pictures"}</h3>
        <div className={styles.description} />
        <ComplexSelect
          onChange={this.updateParam.bind(this, "tags")}
          multiple
          name={"tags"}
          options={tagOptions}
          value={[]}
        />
        <Input
          label={"Keywords"}
          type={"text"}
          name={"keywords"}
          onChange={this.updateParam.bind(this, "keywords")}
        />
        <Input
          label={"Location"}
          type={"text"}
          name={"location"}
          onChange={this.updateParam.bind(this, "location")}
        />
        <Input
          onChange={this.updateParam.bind(this, "date")}
          label={"Date"}
          type={"text"}
          name={"date"}
          placeholder={"YYYY | YYYY-MM | YYYY-MM-DD"}
        />
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BulkParamsForm);
