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

router.get('/sousuo', function(req, res, next) {
    res.render('articletype', { title: '文章类型发表' });

})

/*
//本院简介
router.get('/introduction', function(req, res, next) {
    Article
        .find({})
        .populate('articleType')
        .exec(function(err, articles) {
            var Articles = [];
            for (var i = 0; i < articles.length; i++) {
                if (articles[i].articleType.typeName == '本院简介') {
                    Articles.push(articles[i]);

                }
            }
            res.render('introduction', { title: '本院简介', Articles: Articles });
        })
})

// 一级菜单 "检察快讯",
router.get('/news', function(req, res, next) {
    Article
        .find({})
        .populate('articleType procuratorate')
        .exec(function(err, articles) {
            var Articles = [];
            for (var i = 0; i < articles.length; i++) {
                if (articles[i].articleType.typeName == '检察快讯') {
                    Articles.push(articles[i]);

                }
            }
            res.render('news', { title: '检察快讯', Articles: Articles });
        })
});

//检察快讯子菜单
router.get('/news_details1', function(req, res, next) {
    var _id = req.query._id;
    Article
        .findOne({ _id: _id })
        .populate('articleType procuratorate')
        .exec(function(err, Article) {
            res.render('news_details1', { title: '检察快讯', Article: Article });
        })
})
router.get('/news_details2', function(req, res, next) {
    var _id = req.query._id;
    Article
        .findOne({ _id: _id })
        .populate('articleType procuratorate')
        .exec(function(err, Article) {
            res.render('news_details1', { title: '检察快讯', Article: Article });
        })
})
router.get('/news_details3', function(req, res, next) {
    var _id = req.query._id;
    Article
        .findOne({ _id: _id })
        .populate('articleType procuratorate')
        .exec(function(err, Article) {
            res.render('news_details1', { title: '检察快讯', Article: Article });
        })
})
router.get('/news_details4', function(req, res, next) {
    var _id = req.query._id;
    Article
        .findOne({ _id: _id })
        .populate('articleType procuratorate')
        .exec(function(err, Article) {
            res.render('news_details1', { title: '检察快讯', Article: Article });
        })
})
router.get('/news_details5', function(req, res, next) {
    var _id = req.query._id;
    Article
        .findOne({ _id: _id })
        .populate('articleType procuratorate')
        .exec(function(err, Article) {
            res.render('news_details1', { title: '检察快讯', Article: Article });
        })
})

//一级菜单'阳光百姓工程'

router.get('/sunPeople', function(req, res, next) {
    Article
        .find({})
        .populate('articleType procuratorate')
        .exec(function(err, articles) {
            var Articles1 = [];
            var Articles2 = [];
            var Articles3 = [];
            for (var i = 0; i < articles.length; i++) {
                if (articles[i].articleType.typeName == '基础建设') {
                    Articles1.push(articles[i]);

                }
                if (articles[i].articleType.typeName == '惠农补贴') {
                    Articles2.push(articles[i]);

                }
                if (articles[i].articleType.typeName == '领域建设') {
                    Articles3.push(articles[i]);

                }
            }
            res.render('sunPeople', { title: '阳光百姓工程', Articles1: Articles1, Articles2: Articles2, Articles3: Articles3 });
        })
})

//一级菜单'预防教育'
router.get('/preventionCrime', function(req, res, next) {
        Article
            .find({})
            .populate('articleType procuratorate')
            .exec(function(err, articles) {
                var Articles = [];
                for (var i = 0; i < articles.length; i++) {
                    if (articles[i].articleType.typeName == '预防教育') {
                        Articles.push(articles[i]);
                    }
                }
                res.render('preventionCrime', { title: '预防教育', Articles: Articles });
            })
    })
    //预防教育子菜单
router.get('/crime_details1', function(req, res, next) {
    var _id = req.query._id;
    Article
        .findOne({ _id: _id })
        .populate('articleType procuratorate')
        .exec(function(err, Article) {
            res.render('crime_details1', { title: '预防教育', Article: Article });
        })
})

router.get('/crime_details2', function(req, res, next) {
    var _id = req.query._id;
    Article
        .findOne({ _id: _id })
        .populate('articleType procuratorate')
        .exec(function(err, Article) {
            res.render('crime_details1', { title: '预防教育', Article: Article });
        })
})

router.get('/crime_details3', function(req, res, next) {
    var _id = req.query._id;
    Article
        .findOne({ _id: _id })
        .populate('articleType procuratorate')
        .exec(function(err, Article) {
            res.render('crime_details1', { title: '预防教育', Article: Article });
        })
})

router.get('/crime_details4', function(req, res, next) {
    var _id = req.query._id;
    Article
        .findOne({ _id: _id })
        .populate('articleType procuratorate')
        .exec(function(err, Article) {
            res.render('crime_details1', { title: '预防教育', Article: Article });
        })
})

//一级菜单'网格监督'

router.get('/patrolAttorney', function(req, res, next) {
    Article
        .find({})
        .populate('articleType procuratorate')
        .exec(function(err, articles) {
            var Articles = [];
            for (var i = 0; i < articles.length; i++) {
                if (articles[i].articleType.typeName == '巡检概况') {
                    Articles.push(articles[i]);
                }
            }
            res.render('patrolAttorney', { title: '巡检概况', Articles: Articles });
        })
});

//一级菜单'线索受理'

router.get('/report', function(req, res, next) {
    res.render('report', { title: '线索受理' });
})


// 一级菜单 "检察联络员",
router.get('/attorneyLiaison', function(req, res, next) {
    res.render('attorneyLiaison', { title: '检察联络员' });
});
// 二级菜单 "检察联络员"-职责
router.get('/attorneyDetails', function(req, res, next) {
    Article
        .find({})
        .populate('articleType')
        .exec(function(err, articles) {
            var Articles = [];
            for (var i = 0; i < articles.length; i++) {
                if (articles[i].articleType.typeName == '联络员职责') {
                    Articles.push(articles[i]);
                }
            }
            res.render('attorneyDetails', { title: '检察联络员职责', Articles: Articles });
        })

});
// 二级菜单 "检察联络员"-联系人
router.get('/attorneyAddress', function(req, res, next) {
    res.render('attorneyAddress', { title: '检察联络员一览表' });
});

// 一级菜单检察地图
router.get('/maps', function(req, res, next) {
    res.render('maps', { title: '检察地图' });
});
*/
module.exports = router;