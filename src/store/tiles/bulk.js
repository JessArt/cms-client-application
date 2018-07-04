import { createSyncTile, createTile } from "redux-tiles";
import { preparePictureForm } from "../../utils/forms";
import { readFile } from "../../utils/files";

export const bulkParams = createSyncTile({
  type: ["bulk", "params"],
  fn: ({ params: { value } = {} }) => value,
  nesting: ({ type }) => [type]
});

export const bulkEditingState = createSyncTile({
  type: ["bulk", "editing", "state"],
  fns: {
    choose: () => "choose",
    cancel: () => "empty",
    edit: () => "edit"
  }
});

export const bulkEditingChoosing = createSyncTile({
  type: ["bulk", "editing", "choosing"],
  initialState: {},
  fns: {
    toggle: ({ getData, params }) => {
      const currentData = getData();

      return currentData ? undefined : params;
    }
  },
  nesting: ({ id }) => [id]
});

export const bulkEditingParams = createSyncTile({
  type: ["bulk", "editing", "params"],
  fn: ({ params: { value } = {} }) => value,
  nesting: ({ type }) => [type]
});

export const bulkChoosing = createTile({
  type: ["bulk", "choosing"],
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
  }
});

export const bulkUploading = createTile({
  type: ["bulk", "upload"],
  fn: async ({ params, dispatch, actions, history, routes }) => {
    for (const image of params) {
      const form = preparePictureForm({ form: image.form, picture: image });
      await dispatch(actions.api.savePicture({ form, fakeId: image.fakeId }));
    }

    dispatch(
      actions.ui.notifications.add({
        id: "upload_pictures",
        type: "success",
        message: "Pictures were successfully added"
      })
    );
    setTimeout(() => history.push(routes.pictures), 100);

    return { success: true };
  }
});

export const bulkUpdating = createTile({
  type: ["bulk", "update"],
  fn: async ({ params, dispatch, actions, history, routes }) => {
    for (const image of params) {
      const form = preparePictureForm({ form: image.form, picture: image });
      await dispatch(actions.api.savePicture({ form, id: image.id }));
    }

    dispatch(
      actions.ui.notifications.add({
        id: "update_pictures",
        type: "success",
        message: "Pictures were successfully updated"
      })
    );
    setTimeout(() => history.push(routes.pictures), 100);

    return { success: true };
  }
});

export default [
  bulkChoosing,
  bulkUploading,
  bulkParams,
  bulkEditingState,
  bulkEditingChoosing,
  bulkEditingParams,
  bulkUpdating
];
