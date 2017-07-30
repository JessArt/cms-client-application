import React from 'react';
import RPT from 'prop-types';
import { parse } from 'query-string';
import Pictures from '../ui/pictures';
import ContainerLayout from '../layouts/container';

const ImagesPage = ({ location: { search } }) => (
  <ContainerLayout wide>
    <Pictures params={parse(search)} />
  </ContainerLayout>
);

ImagesPage.propTypes = {
  location: RPT.shape({
    search: RPT.string,
  }),
};

export default ImagesPage;
