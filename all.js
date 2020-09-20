const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/xiongDb', {
  useNewUrlParser: true,
});

// 连接错误
mongoose.connection.on('error', (error) => {
  console.log('数据库连接失败!', error);
});

// 连接成功
mongoose.connection.once('open', () => {
  console.log('数据库连接成功!');
});

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
});

const Article = mongoose.model('Article', articleSchema);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const router = express.Router();

router.get('/getArticleList', function (req, res) {
  Article.find(function (err, data) {
    if (err) {
      return res.status(500).send('Server error');
    }
    return res.json({ success: true, data });
  });
});

router.post('/addArticle', function (req, res) {
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
});

//为我们的http请求添加 /api
app.use('/api', router);

//将我们的后端发送到端口
app.listen(4500, () => console.log(`LISTENING ON PORT 4500`));
