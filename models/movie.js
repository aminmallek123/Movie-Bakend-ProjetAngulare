const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Categorie = require("./categorie.js");
const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    dateDebut: {
        type: Date,
        required: true,
    },

    dateFin: {
        type: Date,
        required: true,
    },

    time: {
        type: String,
        required: true,
    },

    prix: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    categorieID1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Categorie
    },
},
);
module.exports = mongoose.model('Movie', movieSchema)
