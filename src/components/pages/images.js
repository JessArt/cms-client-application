import React from 'react';
import RPT from 'prop-types';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import Input from '../elements/input';
import Pictures from '../ui/pictures';
import ContainerLayout from '../layouts/container';
import FixedControls from '../ui/fixedControls';
import { actions } from '../../store';

const mapDispatchToProps = {
  chooseFiles: actions.bulk.choosing,
};

const ImagesPage = ({ location: { search }, chooseFiles }) => {
  const onChange = event => chooseFiles(event.target.files);
  return (
    <ContainerLayout wide>
      <Pictures params={parse(search)} />
      <FixedControls>
        <Input onChange={onChange} type={'file'} multiple />
      </FixedControls>
    </ContainerLayout>
  );
};

ImagesPage.propTypes = {
  location: RPT.shape({
    search: RPT.string,
  }),
  chooseFiles: RPT.func,
};

export default connect(null, mapDispatchToProps)(ImagesPage);
