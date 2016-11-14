var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var ArticleType = require('../models/articletype');
var Procuratorate = require('../models/procuratorate');
/* GET users listing. */

//文章类型表的存储
router.get('/type', function(req, res, next) {
    res.render('articletype', { title: '文章类型发表' });
})

router.post('/type', function(req, res, next) {
    var typeName = req.body.articletype;

    var description = req.body.content;
    if (typeName == undefined || typeName == "") {
        res.render(error);
    }
    var articleType = new ArticleType({
        typeName: typeName,

        description: description
    });
    articleType.save(function(err, articletype) {
        if (err) console.log(err);
        res.redirect('/article/typeList');
    });
})

//获取类型列表
router.get('/typeList', function(req, res, next) {
    ArticleType.find({}, function(err, articletypes) {
        res.render('type-list', { title: '类型列表', articletypes: articletypes })
    })

})

//删除文章类型
router.get('/typeDel', function(req, res, next) {
    var _id = req.query._id;

    ArticleType.remove({ _id: _id }, function(err) {
        if (err) console.log(err);
        res.redirect('/article/typeList');
    })
})

//获取编辑文章类型页面
router.get('/typeEdit', function(req, res, next) {
    var _id = req.query._id;
    ArticleType.findOne({ _id: _id }, function(err, articletypes) {

        res.render('typeEdit', { title: '编辑文章', articletypes: articletypes });

    })

})

//更新文章类型
router.post('/typeUpdate', function(req, res, next) {
    var typeName = req.body.articletype;
    var _id = req.body._id;
    var description = req.body.content;
    ArticleType.update({ _id: _id }, { $set: { typeName: typeName, description: description } }, function(err, result) {
        if (err) console.log(err);
        res.redirect('/article/typeList');
    })
})

//获取发表文章页面
router.get('/add', function(req, res, next) {
    ArticleType.find({}, function(err, articletypes) {
        Procuratorate.find({}, function(err, procuratorates) {
            res.render('pushArticle', { title: '发表文章', articletypes: articletypes, procuratorates: procuratorates });
        })

    })

})



//发表文章
router.post('/add', function(req, res, next) {
    var title = req.body.title;
    var author = req.body.author;
    var content = req.body.content;
    var articleType = req.body.articleType;
    var procuratorate = req.body.procuratorate;

    var article = new Article({
        title: title,
        author: author,
        content: content,

        procuratorate: procuratorate,
        articleType: articleType
    });

    article.save(function(err, articles) {
        if (err) console.log(err);
        console.log(articles);
        res.redirect('/article/list');
    })
})

//显示文章列表
router.get('/list', function(req, res, next) {
    Article
        .find({})
        .populate('articleType procuratorate')
        .exec(function(err, Articles) {
            res.render('article-list', { title: '文章列表', Articles: Articles });
        })

})

//删除文章

router.get('/del', function(req, res, next) {

    var _id = req.query._id;
    console.log(_id);
    Article.remove({ _id: _id }, function(err) {
        if (err) console.log(err);

        res.redirect('/article/list');

    })


})

//获取编辑文章页面
router.get('/edit', function(req, res, next) {
    var _id = req.query._id;
    Article.findOne({ _id: _id }, function(err, articles) {
        ArticleType.find({}, function(err, articletypes) {
            Procuratorate.find({}, function(err, procuratorates) {
                res.render('edit', { title: '编辑文章', articles: articles, articletypes: articletypes, procuratorates: procuratorates });
            })

        })

    })
})

//更新文章
router.post('/update', function(req, res, next) {
    var _id = req.body._id;
    var title = req.body.title;
    var author = req.body.author;

    var content = req.body.content;
    var articleType = req.body.articleType;
    var procuratorate = req.body.procuratorate;
    Article.update({ _id: _id }, { $set: { title: title, author: author, content: content, articleType: articleType, procuratorate: procuratorate } }, function(err, result) {
        if (err) console.log(err);
        res.redirect('/article/list');
    })
})




module.exports = router;