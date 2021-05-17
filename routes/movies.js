const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const { validateCreateMovie, validateDeleteMovie } = require('../middlewares/validatons');

router.get('/', getMovies);

router.post('/', validateCreateMovie, createMovie);
router.delete('/:id', validateDeleteMovie, deleteMovie);

module.exports = router;
