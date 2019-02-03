export default {
  login: "/login",
  home: "/",
  bulk: "/bulk",
  slider: "/slider",
  bulkEditing: "/bulk/editing",
  tags: "/tags",
  pictures: "/pictures",
  picture: "/pictures/:id",
  createPictureURL: id => `/pictures/${id}`,
  articles: "/articles",
  article: "/articles/:id",
  createArticleURL: id => `/articles/${id}`
};
