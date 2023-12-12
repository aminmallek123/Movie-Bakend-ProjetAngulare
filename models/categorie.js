const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const categorieSchema = new mongoose.Schema({

    categorieName: {
        type: String,
        required: true,
        unique: true
    },

  


},
);
module.exports = mongoose.model('categorie', categorieSchema)
