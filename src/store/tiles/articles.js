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
  fn: ({ api, params }) => api.post('/article', params),
});

export default [
  article,
  articles,
  saveArticle,
];
