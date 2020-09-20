const mongoose = require('mongoose');
const CONFIG = require('../config.js');

mongoose.set('useFindAndModify', false);

// connect
exports.connect = () => {
  // 连接数据库
  mongoose.connect(CONFIG.MONGODB.uri, {
    // useCreateIndex: true,
    useNewUrlParser: true,
    // promiseLibrary: global.Promise,
  });

  // 连接错误
  mongoose.connection.on('error', (error) => {
    console.log('数据库连接失败!', error);
  });

  // 连接成功
  mongoose.connection.once('open', () => {
    console.log('数据库连接成功!');
  });

  // 自增 ID 初始化
  // autoIncrement.initialize(mongoose.connection);

  // 返回实例
  return mongoose;
};

// mongoose
exports.mongoose = mongoose;
