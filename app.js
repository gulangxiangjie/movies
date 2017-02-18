var express = require('express');
var path = require('path');
var _ = require('underscore');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var bodyParser = require('body-parser');
var app = express();
var Movie = require('./models/movie');

mongoose.connect('mongodb://localhost/movies');

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port);

console.log(`Movie project have been start at port ${port}`);

app.get('/', (req, res) => {
  //res.sendFile(path.join(__dirname, './index.html'));
  Movie.fetch((err, movies) => {
    if (err) {
      console.log(err);
    }
    res.render('index', {
      title: 'Movie 首页',
      movies: movies
    });
  });
});
app.get('/movie/detail/:id', (req, res) => {
  var id = req.params.id;
  Movie.findById(id, (err, movie) => {
    res.render('detail', {
      title: `${movie.title}(${movie.year})`,
      movie: movie
    });
  });
});
app.get('/admin/movie/list', (req, res) => {
  res.render('list', {
    title: 'Movie 列表页'
  });
});
app.get('/admin/movie', (req, res) => {
  res.render('movie-edit', {
    title: '添加电影',
    movie: {
      title: '',
      doctor: '',
      country: '',
      year: '',
      poster: '',
      flash: '',
      summary: '',
      language: ''
    }
  });
});
app.post('/admin/movie', (req, res) => {
  var id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;
  if (id !== 'undefined') {
    Movie.findById(id, (err, movie) => {
      if (err) {
        console.log(err);
      }
      _movie = _.extend(movie, movieObj);
      _movie.save((err, movie) => {
        if (err) {
          console.log(err);
        }
        res.redirect(`/movie/detail/${movie._id}`);
      });
    });
  } else {
    _movie = new Movie({
      title: movieObj.title,
      doctor: movieObj.doctor,
      language: movieObj.language,
      country: movieObj.country,
      summary: movieObj.summary,
      flash: movieObj.flash,
      poster: movieObj.poster,
      year: movieObj.year,
      title: movieObj.title
    });
    _movie.save((err, movie) => {
      if (err) {
        console.log(err);
      }
      res.redirect(`/movie/detail/${movie._id}`);
    });
  }
});
app.get('/admin/movie/:id', (req, res) => {
  var id = req.params.id;
  Movie.findById(id, (err, movie) => {
    res.render('movie-edit', {
      title: '修改电影',
      movie: movie
    });
  });
});