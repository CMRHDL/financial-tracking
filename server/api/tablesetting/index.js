'use strict';

var express = require('express');
var controller = require('./tablesetting.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.patch('/', controller.update);
/*
router.get('/lastAddedDate', controller.lastAddedDate);
router.delete('/', controller.deleteAll);
router.patch('/attribution', controller.patchAttribution);
router.get('/:id', controller.show);
router.put('/:id', controller.update);
*/

module.exports = router;