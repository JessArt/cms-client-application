import { createTile } from "redux-tiles";

const sliderImages = createTile({
  type: ["api", "sliderImages"],
  fn: ({ api }) => {
    return api.get("/v1/slider_images");
  }
});

const updateSliderImages = createTile({
  type: ["api", "updateSliderImages"],
  fn: ({ api, params, dispatch, actions, selectors, getState }) => {
    dispatch(
      actions.ui.notifications.add({
        id: "update_slider_images",
        type: "warning",
        message: "Started to update slider images..."
      })
    );
    const token = selectors.auth.status(getState());
    return api
      .post(`/v1/slider_images?token=${token}`, {
        images: params.images
      })
      .then(() => {
        dispatch(
          actions.ui.notifications.add({
            id: "update_slider_images",
            type: "success",
            message: "Slider images were updated successfully!"
          })
        );
      })
      .catch(() => {
        dispatch(
          actions.ui.notifications.add({
            id: "update_slider_images",
            type: "error",
            message: "Error happened during slider images updating :("
          })
        );
      });
  }
});

export default [sliderImages, updateSliderImages];
