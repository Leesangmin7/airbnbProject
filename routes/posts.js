var express = require('express'),
    Post = require('../models/Post');
var router = express.Router();

//List화면 표현
router.get('/', function(req, res, next) {
  Post.find({}, function(err, posts) {
    if (err) {
      return next(err);
    }
    res.render('posts/index', {
        posts: posts
    });
  });
});

//글쓰기 표현
router.get('/new', function(req, res, next) {
  Post.findById({_id: req.params.id}, function(err, post) {

    res.render('posts/edit', {post: Post});
  });

});

router.get('/:id/edit', function(req, res, next) {
  Post.findById({_id: req.params.id}, function(err, post) {
    if (err) {
      return next(err);
    }
    res.render('posts/edit', {post: post});
    
    });
});


// 글 작성내용 데이터베이스에 저장
router.post('/', function(req, res, next) {

    var poster = new Post({
     
     // email: req.body.email,
      title: req.body.title,
      content: req.body.content,
      password: req.body.password
    });
    
    poster.save(function(err) {
      if (err) {
        return next(err);
      } else {
        res.redirect('/');
      }
    });
});




// 글 수정 후 저장
router.put('/:id', function(req, res, next) {

  Post.findById({_id: req.params.id}, function(err, post) {
    if (err) {
      return next(err);
    }
    if (!post) {
      return res.redirect('back');
    }


//비밀번호
    if (post.password !== req.body.password) {
      return res.redirect('back');
    }

   
    //post.email = req.body.email;
    post.title = req.body.title;
    post.content = req.body.content;


    post.save(function(err) {
      if (err) {
        return next(err);
      }
     
      res.redirect('/posts');
    });
  });   
});

// 상세 보기
router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id, function(err, post) {
    if (err) {
      return next(err);
    }
    post.read = post.read + 1;
    post.save(function(err) {
      if (err) {
        return next(err);
      } else {
       res.render('posts/show', {post: post});
      }
    });
  });
});

// 글 삭제
router.delete('/:id', function(req, res, next) {
  Post.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/posts');
  });
});


module.exports = router;
