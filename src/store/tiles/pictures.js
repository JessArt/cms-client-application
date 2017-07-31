import { createTile } from 'redux-tiles';
import { DEFAULT_IMAGE_TYPE } from '../../utils/constants';
import { readFile } from '../../utils/files';

export const picture = createTile({
  type: ['api', 'picture'],
  fn: ({ api, params }) => api.get(`/v1/api/images/${params.id}`),
  nesting: ({ id }) => [id],
});

export const pictures = createTile({
  type: ['api', 'pictures'],
  fn: ({ api, params }) => api.get('/v3/api/images', { type: params.type, pageNumber: params.page }),
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

export const bulkChoosing = createTile({
  type: ['bulk', 'choosing'],
  fn: async ({ params: files, history, routes }) => {
    const numberOfFiles = files.length;
    const parsedFiles = [];

    for (let i = 0; i < numberOfFiles; i++) {
      const file = files[i];
      parsedFiles.push(readFile(file));
    }

    const chosenPictures = await Promise.all(parsedFiles);
    setTimeout(() => history.push(routes.bulk), 100);
    return chosenPictures;
  },
});

export default [
  picture,
  pictures,
  uploadPicture,
  savePicture,
  bulkChoosing,
];
