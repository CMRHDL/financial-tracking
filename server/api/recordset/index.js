'use strict';

var express = require('express');
var controller = require('./recordset.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/lastAddedDate', controller.lastAddedDate);
router.post('/', controller.create);
router.post('/backup', controller.backup);
router.post('/filter', controller.filter);
router.delete('/', controller.deleteAll);
router.delete('/:id', controller.deleteById);
router.patch('/', controller.update);
router.patch('/attribution', controller.patchAttribution);
/*
router.get('/:id', controller.show);
router.put('/:id', controller.update);
*/

module.exports = router;
