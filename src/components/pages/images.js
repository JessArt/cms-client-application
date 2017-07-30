import React from 'react';
import Pictures from '../ui/pictures';
import ContainerLayout from '../layouts/container';

const ImagesPage = ({ location: { query = {} } }) => (
  <ContainerLayout wide>
    <Pictures params={query} />
  </ContainerLayout>
);

export default ImagesPage;
