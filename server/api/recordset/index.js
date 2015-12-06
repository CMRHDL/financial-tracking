'use strict';

var express = require('express');
var controller = require('./recordset.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.delete('/', controller.deleteAll);
/*
router.get('/:id', controller.show);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
*/

module.exports = router;