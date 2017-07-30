import { createTile } from 'redux-tiles';

export const picture = createTile({
  type: ['api', 'picture'],
  fn: ({ api, params }) => api.get(`/v1/api/images/${params.id}`),
  nesting: ({ id }) => [id],
});

export const pictures = createTile({
  type: ['api', 'pictures'],
  fn: ({ api, params }) => api.get('/v3/api/images', params),
});

export const uploadPicture = createTile({
  type: ['api', 'uploadPicture'],
  fn: ({ api, params: { form, cb } }) => api.post('/v1/api/images/upload', form).then(cb),
});

export default [
  picture,
  pictures,
  uploadPicture,
];
