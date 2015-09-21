var router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;

var mongoURL = process.env.MONGO_URL;

router.route('/messages')
    .post(function (req, res, next) {
        var txtMessage = (req.body.message || 'empty message');
        // Storing message in database
        MongoClient.connect(mongoURL, function(err, db) {
            console.log("Connected to database");

            db.collection('messages').insertOne({'message': txtMessage}, {w: 1 }, function (err, item) {
                if (err) {
                    console.log('Error storing message in database: ' + err);
                    db.close();
                    res.status(400).send('Error, unable to store message: ' + txtMessage);
                } else {
                    db.close();
                    console.log('Message stored ok in database: ' + txtMessage);
                    res.status(200).send('Message stored: "' + txtMessage + '"');
                }
            });
        });
        // End storing message in database
    });


router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

module.exports = router;