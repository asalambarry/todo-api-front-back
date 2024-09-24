const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
// Importation des contrôleurs
const { addTache, getTaches,editTache , deleteTache, getTacheById } = require('../controllers/TodoController');

// Routes
router.post('/',auth,addTache);
router.get('/', auth,getTaches);
router.get('/:id', auth,getTacheById)
router.put('/:id', auth,editTache);
router.delete('/:id', auth, deleteTache);

module.exports = router;
