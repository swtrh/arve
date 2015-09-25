var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongoURL = process.env.MONGO_URL;
mongoose.connect(mongoURL);

var shipSchema = new Schema({
    name: String,
    mmsi: String,
    position: {
        lat: Number,
        lng: Number
    }
});

module.exports = {
    Ship: mongoose.model('Ship', shipSchema)
};
