var router = require('express').Router();

var database = require('../database');
var Ship = database.Ship;

router.route('/ships')
    .get(function (req, res, next) {
        Ship.find(function (err, result) {
            res.send(result);
        });
    })
    .post(function(req, res, next) {
        var ship = new Ship(req.body);
        if(ship._id) {
            // Update
            var upsertData = ship.toObject();
            delete upsertData._id;
            Ship.update({_id: ship._id}, upsertData, {upsert: true}, function(err, obj) {
                if(err) {
                    err.status = 500;
                    return next(err);
                }
                res.status(200);
                res.send(ship);
            });
        } else {
            ship.save(function(err, obj) {
                if(err) {
                    err.status = 500;
                    return next(err);
                }

                res.status(200);
                res.send(ship);

            })
        }

    });

module.exports = router;