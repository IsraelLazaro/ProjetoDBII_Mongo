var express = require('express');
var router = express.Router();
const eventControllers = require('../controllers/eventControllers');

router.get('/', eventControllers.listarEventos);
router.get('/:texto', eventControllers.buscarEvento);
router.post('/', eventControllers.salvarEvento);
router.delete('/:id', eventControllers.deletarEvento);
router.put('/:id', eventControllers.editarEvento);

module.exports = router;