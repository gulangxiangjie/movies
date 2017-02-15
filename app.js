var express = require('express');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

app.set('views', './views');
app.set('view engine', 'jade');

app.listen(port);

console.log(`Movie project have been start at port ${port}`);

app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, './index.html'));
  res.render('index', {
    title: 'Movie 首页'
  });
});
app.get('/movie/detail/:id', (req, res) => {
  res.render('detail', {
    title: 'Movie 详情页'
  });
});
app.get('/admin/movie/list', (req, res) => {
  res.render('list', {
    title: 'Movie 列表页'
  });
});
app.get('/admin/movie/new', (req, res) => {
  res.render('admin', {
    title: 'Movie 添加电影页'
  });
});