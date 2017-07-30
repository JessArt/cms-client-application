import React from 'react';
import Articles from '../ui/articles';
import Button from '../elements/button';
import FixedControls from '../ui/fixedControls';
import routes from '../../routing/routes';

const ArticlesPage = () => (
  <div>
    <FixedControls>
      <Button to={routes.createArticleURL('new')}>
        {'Write new article'}
      </Button>
    </FixedControls>
    <Articles />
  </div>
);

export default ArticlesPage;
