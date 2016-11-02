var express = require('express');
var passport = require('passport');
var csurf = require('csurf');
var csrfProtection = csurf({ cookie: true });
var Account = require('../models/account');
var router = express.Router();
var Procuratorate = require('../models/procuratorate');

router.get('/', function(req, res, next) {
    res.render('admin/index', { title: 'demo', user: req.user });
});

//检察院数据存储

router.get('/procuratorate', function(req, res, next) {
    res.render('procuratorate');
})

module.exports = router;