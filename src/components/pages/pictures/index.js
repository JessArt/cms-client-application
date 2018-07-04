import React from "react";
import RPT from "prop-types";

import { connect } from "react-redux";
import { actions } from "../../../store";

import Input from "../../elements/input";
import Pictures from "../../ui/pictures";
import ContainerLayout from "../../layouts/container";
import FixedControls from "../../ui/fixedControls";
import BulkEditingControls from "../../ui/bulkEditingControls";

import { parse } from "query-string";

import styles from "./style.sass";

const mapDispatchToProps = {
  chooseFiles: actions.bulk.choosing
};

const ImagesPage = ({ location: { search }, chooseFiles }) => {
  const onChange = event => chooseFiles(event.target.files);
  return (
    <ContainerLayout wide>
      <Pictures params={parse(search)} />
      <FixedControls>
        <div className={styles.controls}>
          <BulkEditingControls />
          <Input onChange={onChange} type={"file"} multiple />
        </div>
      </FixedControls>
    </ContainerLayout>
  );
};

ImagesPage.propTypes = {
  location: RPT.shape({
    search: RPT.string
  }),
  chooseFiles: RPT.func
};

export default connect(null, mapDispatchToProps)(ImagesPage);
