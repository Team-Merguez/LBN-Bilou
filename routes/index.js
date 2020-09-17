const express = require('express');
const router = express.Router();

const APIRoutes = {
  titleNav: 'LBM',
  title: 'La Bonne Merguez',
  cities: ['Paris', 'Lyon', 'Marseille']
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', APIRoutes);
});

router.get('/login', function(req, res, next) {
  res.render('login', APIRoutes);
});

router.get('/signup', function(req, res, next) {
  res.render('signup', APIRoutes);
});

module.exports = router;
