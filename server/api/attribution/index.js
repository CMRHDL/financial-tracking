'use strict';

var express = require('express');
var controller = require('./attribution.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.delete('/', controller.deleteAll);
router.patch('/', controller.update);
/*
router.get('/:id', controller.show);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
*/

module.exports = router;