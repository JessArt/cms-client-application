import { createTile } from "redux-tiles";

export const tags = createTile({
  type: ["api", "tags"],
  fn: ({ api }) => api.get("/v1/tags").then(({ data }) => data),
  caching: true
});

export const imageTags = createTile({
  type: ["api", "imageTags"],
  fn: ({ api, params }) => api.get(`/v1/image_tags/${params.id}`),
  nesting: ({ id }) => [id]
});

export default [tags, imageTags];
