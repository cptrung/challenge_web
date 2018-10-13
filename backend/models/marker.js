const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../utils/db');

var markerSchema = new Schema({
    title: {
        type: String
    },
    address: {
        type: String
    },
    url: {
        type: String
    },
    lat: {
        type: Number, 
    },
    lng: {
        type: Number, 
    }
})

const Marker = mongoose.model('Marker', markerSchema);

module.exports = {
    Marker
};