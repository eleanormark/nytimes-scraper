var express = require('express');
var controller = require('../controllers/app_controller.js');

var router = new express.Router();

router.get('/scrape', controller.scrapeArticles)        // A GET request to scrape the echojs website
    .get('/articles', controller.getAllArticles)        // This will get the articles we scraped from the mongoDB
    .get('/articles/:id', controller.getComments)        // Grab an article by it's ObjectId
    .delete('/article', controller.deleteArticle)
    .post('/newArticle', controller.postNewArticle)         // Grab new article without id
    .post('/comment', controller.postNewComment)      
    .delete('/comment', controller.deleteComment)

module.exports = router;