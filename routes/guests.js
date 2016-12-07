var express = require('express'),
    User = require('../models/User');
var router = express.Router();

function needAuth(req, res, next) {
    if (req.user) {
      next();
    } else {
      req.flash('danger', '로그인이 필요합니다.');
      res.redirect('/signin');
    }
}

/* GET users listing. */
router.get('/index', needAuth, function(req, res, next) {
  User.find({}, function(err, users) {
    if (err) {
      return next(err);
    }
    res.render('guests/index', {users: users});
    });
  });

module.exports = router;
