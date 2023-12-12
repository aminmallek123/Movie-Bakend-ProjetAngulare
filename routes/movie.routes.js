var express = require('express');
var router = express.Router();

const Movie = require('../models/movie');

// afficher la liste des categories.
router.get('/', async (req, res,) => {
    try {
        const cat = await Movie.find();

        res.status(200).json(cat);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }

});
// créer un nouvelle catégorie
router.post('/', async (req, res) => {
    const { name, description, dateDebut, dateFin, time, prix, img, video, categorieID1 } = req.body;
    const d1 = new Date(dateDebut);
    const d2 = new Date(dateFin); // Correction ici

    if (d1 > d2) {
        res.json({ message: "Impossible d'ajouter, la date de début est supérieure à la date de fin" });
    } else {
        const newMovie = new Movie({
            name: name,
            description: description,
            dateDebut: dateDebut,
            dateFin: dateFin,
            time: time,
            prix: prix,
            img: img,
            video: video,
            categorieID1: categorieID1
        });

        try {
            await newMovie.save();
            res.status(200).json(newMovie);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }

});

// chercher une catégorie 
router.get('/:movieId', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.movieId);

        res.status(200).json(movie);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
router.get('/getCategorie/:movieId', async (req, res) => {
    try {
        const id = req.params.movieId;
        const movies = await Movie.find({ categorieID1: id }); // Utilisez find avec un objet de requête
        res.status(200).json(movies);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// modifier une catégorie
router.put('/:categorieId', async (req, res) => {
    const { name,description,dateDebut,dateFin,time,prix,img,video,categorieID1 } = req.body;
    const id = req.params.categorieId;

    try {
        const movie = { name:name,description:description,dateDebut:dateDebut,dateFin:dateFin,
            time:time,prix:prix,img:img,video:video,categorieID1:categorieID1, _id: id };
        console.log(movie)
        await Movie.findByIdAndUpdate(id, movie);

        res.json(movie);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Supprimer une catégorie
router.delete('/:categorieId', async (req, res) => {
    const id = req.params.categorieId;
    await Movie.findByIdAndDelete(id);
    res.json({ message: "movie deleted successfully." });
});

module.exports = router;