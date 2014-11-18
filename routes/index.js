var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/history', function (req, res) {
  res.render('history', { title : 'History' });
});

router.get('/donate', function (req, res) {
  res.render('donate', { title : 'Donate' });
});

router.get('/contact', function (req, res) {
  res.render('contact', { title : 'Contact' });
});

router.get('/sponsors', function (req, res) {
  	fs.readFile("sponsor-data/gold-sponsors.json", function (e1, gold) {
  		fs.readFile("sponsor-data/silver-sponsors.json", function (e2, silver) { 
  			fs.readFile("sponsor-data/bronze-sponsors.json", function (e3, bronze) {
  				var goldSponsors = JSON.parse(gold);
  				var silverSponsors = JSON.parse(silver);
  				var bronzeSponsors = JSON.parse(bronze);

  				res.render('sponsors', { title : 'Sponsors', gold : goldSponsors, 
  					silver : silverSponsors, bronze : bronzeSponsors});
  			});
  		});
  	});
});

function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

router.get('/gallery', function (req, res) {
  var allFiles = fs.readdir('public/images/gallery', function(err, files) {
  	  var imageNames = files.filter(function (str) {
  	  	return endsWith(str, ".jpg") || endsWith(str, ".png") || endsWith(str, ".jpeg");
  	  });
  	  res.render('gallery', { title : 'Gallery', images : imageNames});
  	});
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'CMSR' });
});

module.exports = router;
