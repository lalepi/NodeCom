const mongoose = require('mongoose');

customerSchema = new mongoose.Schema({

    name: String,
    industry: String
});

//What we are importing from this file

module.exports = mongoose.model('Customer', customerSchema);