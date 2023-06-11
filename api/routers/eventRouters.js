var express = require('express');
var router = express.Router();
const eventControllers = require('../controllers/eventControllers');

router.get('/', eventControllers.listarEventos);
router.get('/redis/:chave', eventControllers.listarEventosRedis);
router.get('/:texto', eventControllers.buscarEvento);
router.post('/', eventControllers.salvarEvento);
router.post('/redis', eventControllers.salvarEventoRedis);
router.delete('/:id', eventControllers.deletarEvento);
router.delete('/redis/:chave', eventControllers.deletarDoRedis);
router.put('/:id', eventControllers.editarEvento);

module.exports = router;