import { createTile } from "redux-tiles";

export const tags = createTile({
  type: ["api", "tags"],
  fn: ({ api, params }) => api.get("/v1/tags", params).then(({ data }) => data),
  caching: true
});

export const topTags = createTile({
  type: ["api", "topTags"],
  fn: ({ api, params }) =>
    api
      .get("/v1/top_tags", params)
      .then(data => data.map(({ tag_id }) => tag_id)),
  nesting: ({ type }) => [type]
});

export const updateTopTags = createTile({
  type: ["api", "updateTopTags"],
  fn: ({ api, params, selectors, getState }) => {
    const token = selectors.auth.status(getState());
    return api.post(
      `/v1/top_tags?token=${token}&type=${params.type}`,
      params.form
    );
  },
  nesting: ({ type }) => [type]
});

export const updateTag = createTile({
  type: ["api", "updateTag"],
  fn: ({ api, params, selectors, getState }) => {
    const token = selectors.auth.status(getState());

    return api.put(`/v1/tags/${params.id}?token=${token}`, params.form);
  },
  nesting: ({ id }) => [id]
});

export const imageTags = createTile({
  type: ["api", "imageTags"],
  fn: ({ api, params }) => api.get(`/v1/image_tags/${params.id}`),
  nesting: ({ id }) => [id]
});

export default [tags, imageTags, updateTag, topTags, updateTopTags];
