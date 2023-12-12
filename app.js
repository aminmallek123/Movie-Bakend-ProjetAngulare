const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');


const userRouter = require("./routes/user.routes");
const categorieRouter = require("./routes/categorie.routes");
const movieRouter = require("./routes/movie.routes");
const paymentRouter =require("./routes/payment.route.js");



dotenv.config();
const app = express();

//Les cors 
app.use(cors())

//BodyParser Middleware
app.use(express.json());

mongoose.set("strictQuery", false);

// Connexion à la base données
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("Connexion à la base de données réussie");
    }).catch(err => {
        console.log('Impossible de se connecter à la base de données', err);
        process.exit();
    });

app.get("/", (req, res) => {
    res.send("bonjour");
});


app.use('/api/users', userRouter);
app.use('/api/categorie', categorieRouter);
app.use('/api/movie', movieRouter);
app.use('/api/payment', paymentRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is listening on port ${process.env.PORT}`);
});

module.exports = app;
