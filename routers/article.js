const Article = require('../models/article');

exports.getArticleList = (req, res) => {
  Article.find(function (err, data) {
    if (err) {
      return res.status(500).send('Server error');
    }
    return res.json({ success: true, data });
  });
};

exports.addArticle = (req, res) => {
  const { id, title, content } = req.body;
  const data = new Article({
    id,
    title,
    content,
  });
  data.save((err) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
};
