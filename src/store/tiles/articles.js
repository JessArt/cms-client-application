import { createTile } from 'redux-tiles';

export const article = createTile({
  type: ['api', 'article'],
  fn: ({ api, params }) => api.get(`/v1/api/articles/${params.id}`),
  nesting: ({ id }) => [id],
});

export const articles = createTile({
  type: ['api', 'articles'],
  fn: ({ api }) => api.get('/v2/api/articles'),
});

export const saveArticle = createTile({
  type: ['api', 'saveArticle'],
  fn: ({ api, params }) => api.post('/article', params.form),
  nesting: ({ id = 'default' } = {}) => [id],
});

export const saveArticleWithNotification = createTile({
  type: ['api', 'saveArticleWithNotification'],
  fn: async ({ dispatch, actions, selectors, getState, params, history, routes }) => {
    await dispatch(actions.api.saveArticle(params));
    const { error, data } = selectors.api.saveArticle(getState(), params);

    if (error) {
      dispatch(actions.ui.notifications.add({
        id: 'save_article',
        type: 'error',
        message: 'Error during saving an picture',
      }));
      throw new Error(error);
    } else {
      dispatch(actions.ui.notifications.add({
        id: 'save_article',
        type: 'success',
        message: 'Article was successfully saved',
      }));
    }

    if (!params.id) {
      setTimeout(() => history.push(routes.articles), 100);
    }

    return data;
  },
});

export default [
  article,
  articles,
  saveArticle,
  saveArticleWithNotification,
];
