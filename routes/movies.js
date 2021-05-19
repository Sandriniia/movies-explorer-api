const router = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const {
  validateGetMovies,
  validateCreateMovie,
  validateDeleteMovie,
} = require('../middlewares/validations');

router.get('/', validateGetMovies, getMovies);

router.post('/', validateCreateMovie, createMovie);
router.delete('/:id', validateDeleteMovie, deleteMovie);

module.exports = router;
