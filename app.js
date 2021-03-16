const express = require('express');
const app = express();
const router = express.Router();
const { default: axios } = require('axios');

// To define the port
const port = process.env.PORT || 4000;

// To work on the response in json
router.use(express.json());

movies = {};
const getMovies = (req, res) => {
    const DEFAULT_MOVIES_API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=61cec280feda32b806f9f3187c008707&page=1";
    axios(DEFAULT_MOVIES_API)
    .then(res => res.data)
    .then(data => {
        movies = data;
        res.send(movies);
    })
};

router.get('/', getMovies);

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});