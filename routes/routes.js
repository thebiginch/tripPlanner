var router = require('express').Router();
var models = require('../models/models.js');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Promise = require('bluebird');



router.get('/',function(req,res,next){

	var promiseForHotels = Hotel.findAll({});
	var promiseForRest =Restaurant.findAll({});
	var promiseForAct = Activity.findAll({});

	Promise.all(
				[promiseForHotels,
				promiseForRest,
				promiseForAct
				])

	
		.then(function(results){


			res.render('index',{

				hotels: results[0],
				rests: results[1],
				acts: results[2]
			});

			
			
		})
		.catch(next);
});


module.exports = router;