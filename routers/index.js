const article = require('./article');

module.exports = (app) => {
  app.get('/getArticleList', article.getArticleList);
  app.post('/addArticle', article.addArticle);
};
