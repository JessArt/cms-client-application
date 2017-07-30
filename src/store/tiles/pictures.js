import { createTile } from 'redux-tiles';
import { DEFAULT_IMAGE_TYPE } from '../../utils/constants';

export const picture = createTile({
  type: ['api', 'picture'],
  fn: ({ api, params }) => api.get(`/v1/api/images/${params.id}`),
  nesting: ({ id }) => [id],
});

export const pictures = createTile({
  type: ['api', 'pictures'],
  fn: ({ api, params }) => api.get('/v3/api/images', params),
  nesting: ({ type = DEFAULT_IMAGE_TYPE, page = 0 }) => [type, page],
});

export const uploadPicture = createTile({
  type: ['api', 'uploadPicture'],
  fn: ({ api, params: { form, cb } }) => api.post('/v1/api/images/upload', form).then(cb),
});

const getPictureId = ({ id, fakeId }) => id || fakeId || 'default';

export const savePicture = createTile({
  type: ['api', 'savePicture'],
  fn: ({ api, params }) => {
    return api.post('/image', params);
  },
  nesting: image => [getPictureId(image)],
});

export default [
  picture,
  pictures,
  uploadPicture,
];
