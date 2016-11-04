var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var ArticleType = require('../models/articletype');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});



Article.find({}, function(err, articles) {
    articles.forEach(function(article) {
        var typeID = [];
        typeID.push(article.articleType);
        console.log(typeID);
    })

});





module.exports = router;