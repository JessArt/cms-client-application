import { createTile } from "redux-tiles";

export const article = createTile({
  type: ["api", "article"],
  fn: ({ api, params }) => api.get(`/v1/articles/${params.id}`),
  nesting: ({ id }) => [id]
});

export const articles = createTile({
  type: ["api", "articles"],
  fn: ({ api }) => api.get("/v1/articles").then(({ data }) => data)
});

export const saveArticle = createTile({
  type: ["api", "saveArticle"],
  fn: ({ api, params, selectors, getState }) => {
    const token = selectors.auth.status(getState());

    console.log(params);

    if (params.id) {
      return api.put(`/v1/articles/${params.id}?token=${token}`, params.form);
    } else {
      return api.post(`/v1/articles?token=${token}`, params.form);
    }
  },
  nesting: ({ id = "default" } = {}) => [id]
});

export const saveArticleWithNotification = createTile({
  type: ["api", "saveArticleWithNotification"],
  fn: async ({
    dispatch,
    actions,
    selectors,
    getState,
    params,
    history,
    routes
  }) => {
    const { error, data } = await dispatch(actions.api.saveArticle(params));

    if (error) {
      dispatch(
        actions.ui.notifications.add({
          id: "save_article",
          type: "error",
          message: "Error during saving an article"
        })
      );
      throw new Error(error);
    } else {
      dispatch(
        actions.ui.notifications.add({
          id: "save_article",
          type: "success",
          message: "Article was successfully saved"
        })
      );
    }

    if (!params.id) {
      setTimeout(() => history.push(routes.articles), 100);
    }

    return data;
  }
});

export default [article, articles, saveArticle, saveArticleWithNotification];
