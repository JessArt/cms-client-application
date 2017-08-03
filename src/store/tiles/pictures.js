import { createTile } from 'redux-tiles';
import { DEFAULT_IMAGE_TYPE } from '../../utils/constants';
import { readFile } from '../../utils/files';
import { preparePictureForm } from '../../utils/forms';

export const picture = createTile({
  type: ['api', 'picture'],
  fn: ({ api, params }) => api.get(`/v1/api/images/${params.id}`),
  nesting: ({ id }) => [id],
});

export const pictures = createTile({
  type: ['api', 'pictures'],
  fn: ({ api, params }) => api.get('/v3/api/images', { type: params.type, pageNumber: params.page, pageSize: 30 }),
  nesting: ({ type = DEFAULT_IMAGE_TYPE, page = 0 }) => [type, page],
});

export const uploadPicture = createTile({
  type: ['api', 'uploadPicture'],
  fn: ({ api, params: { form, cb } }) => api.post('/v1/api/images/upload', form).then(cb),
});

const getPictureId = ({ id, fakeId }) => id || fakeId || 'default';

export const savePicture = createTile({
  type: ['api', 'savePicture'],
  fn: async ({ api, params }) => api.post('/image', params.form),
  nesting: image => [getPictureId(image)],
});

export const savePictureWithNotification = createTile({
  type: ['api', 'savePictureWithNotification'],
  fn: async ({ params, dispatch, actions, selectors, getState }) => {
    await dispatch(actions.api.savePicture(params));
    const { error, data } = selectors.api.savePicture(getState(), params);

    if (error) {
      dispatch(actions.ui.notifications.add({
        id: 'save_picture',
        type: 'error',
        message: 'Error during saving a picture',
      }));
      throw new Error(error);
    } else {
      dispatch(actions.ui.notifications.add({
        id: 'save_picture',
        type: 'success',
        message: 'Picture was successfully saved',
      }));
      return data;
    }
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

export const bulkUploading = createTile({
  type: ['bulk', 'upload'],
  fn: async ({ params, dispatch, actions, history, routes }) => {
    const promises = params.map((image) => {
      const form = preparePictureForm({ form: image.form, picture: image });
      return dispatch(actions.api.savePicture({ form, fakeId: image.fakeId }));
    });

    await promises;
    dispatch(actions.ui.notifications.add({
      id: 'upload_pictures',
      type: 'success',
      message: 'Pictures were successfully added',
    }));
    setTimeout(() => history.push(routes.pictures), 100);

    return { success: true };
  },
});

export default [
  picture,
  pictures,
  uploadPicture,
  savePicture,
  savePictureWithNotification,
  bulkChoosing,
  bulkUploading,
];
