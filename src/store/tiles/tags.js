import { createTile } from 'redux-tiles';

export const tags = createTile({
  type: ['api', 'tags'],
  fn: ({ api }) => api.get('/v1/api/tags'),
  caching: true,
});

export const imageTags = createTile({
  type: ['api', 'imageTags'],
  fn: ({ api, params }) => api.get(`/v1/api/image_tags/${params.id}`),
  nesting: ({ id }) => [id],
});

export default [
  tags,
  imageTags,
];
