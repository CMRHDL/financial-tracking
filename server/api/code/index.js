'use strict';

var express = require('express');
var controller = require('./code.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/max', controller.max);
router.post('/', controller.create);
router.delete('/', controller.deleteAll);
/*
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
*/

module.exports = router;