import { createTile } from "redux-tiles";
import { DEFAULT_IMAGE_TYPE } from "../../utils/constants";

export const picture = createTile({
  type: ["api", "picture"],
  fn: ({ api, params }) => api.get(`/v1/images/${params.id}`),
  nesting: ({ id }) => [id]
});

export const pictures = createTile({
  type: ["api", "pictures"],
  fn: ({ api, params }) =>
    api.get("/v1/images", {
      type: params.type,
      tags: params.tags,
      pageNumber: params.page,
      pageSize: 30
    }),
  nesting: ({ type = DEFAULT_IMAGE_TYPE, page = 0, tags = "no_tags" }) => [
    type,
    page,
    tags
  ]
});

export const uploadPicture = createTile({
  type: ["api", "uploadPicture"],
  fn: ({
    api,
    params: { form, cb },
    dispatch,
    actions,
    selectors,
    getState
  }) => {
    dispatch(
      actions.ui.notifications.add({
        id: "paste_picture",
        type: "warning",
        message: "Started to upload a picture..."
      })
    );
    const token = selectors.auth.status(getState());
    return api
      .post(`/v1/images/upload?token=${token}`, form)
      .then(data => {
        cb(data);
        dispatch(
          actions.ui.notifications.add({
            id: "paste_picture",
            type: "success",
            message: "Picture was uploaded successfully!"
          })
        );
      })
      .catch(() => {
        dispatch(
          actions.ui.notifications.add({
            id: "paste_picture",
            type: "error",
            message: "Error happened during picture uploading :("
          })
        );
      });
  }
});

export const uploadGIF = createTile({
  type: ["api", "uploadGIF"],
  fn: ({
    api,
    params: { form, cb },
    dispatch,
    actions,
    selectors,
    getState
  }) => {
    dispatch(
      actions.ui.notifications.add({
        id: "paste_gif",
        type: "warning",
        message: "Started to upload a GIF..."
      })
    );
    const token = selectors.auth.status(getState());
    return api
      .post(`/v1/images/upload_gif?token=${token}`, form)
      .then(data => {
        cb(data);
        dispatch(
          actions.ui.notifications.add({
            id: "paste_gif",
            type: "success",
            message: "GIF was uploaded successfully!"
          })
        );
      })
      .catch(() => {
        dispatch(
          actions.ui.notifications.add({
            id: "paste_gif",
            type: "error",
            message: "Error happened during GIF uploading :("
          })
        );
      });
  }
});

const getPictureId = ({ id, fakeId }) => id || fakeId || "default";

export const savePicture = createTile({
  type: ["api", "savePicture"],
  fn: ({ api, params, getState, selectors }) => {
    const token = selectors.auth.status(getState());
    if (params.id && !params.fakeId) {
      return api.put(`/v1/images/${params.id}?token=${token}`, params.form);
    } else {
      return api.post(`/v1/images?token=${token}`, params.form);
    }
  },
  nesting: image => [getPictureId(image)]
});

export const deletePicture = createTile({
  type: ["api", "deletePicture"],
  fn: ({ api, params, getState, selectors }) => {
    const token = selectors.auth.status(getState());
    return api.deleteRequest(`/v1/images/${params.id}?token=${token}`, {
      id: params.id
    });
  },
  nesting: image => [getPictureId(image)]
});

export const deletePictureWithRedirect = createTile({
  type: ["api", "deletePictureWithRedirect"],
  fn: async ({ params, actions, dispatch, history, routes }) => {
    const { error } = await dispatch(actions.api.deletePicture(params));

    if (error) {
      dispatch(
        actions.ui.notifications.add({
          id: "delete_picture",
          type: "error",
          message: "Error during deleting a picture"
        })
      );
    } else {
      dispatch(
        actions.ui.notifications.add({
          id: "delete_picture",
          type: "success",
          message: "Picture was successfully deleted"
        })
      );
      history.push(routes.pictures);
    }
  }
});

export const savePictureWithNotification = createTile({
  type: ["api", "savePictureWithNotification"],
  fn: async ({ params, dispatch, actions }) => {
    const { error, data } = await dispatch(actions.api.savePicture(params));

    if (error) {
      dispatch(
        actions.ui.notifications.add({
          id: "save_picture",
          type: "error",
          message: "Error during saving a picture"
        })
      );
      throw new Error(error);
    } else {
      dispatch(
        actions.ui.notifications.add({
          id: "save_picture",
          type: "success",
          message: "Picture was successfully saved"
        })
      );
      return data;
    }
  },
  nesting: image => [getPictureId(image)]
});

export default [
  picture,
  pictures,
  uploadPicture,
  uploadGIF,
  savePicture,
  deletePicture,
  deletePictureWithRedirect,
  savePictureWithNotification
];
