'use strict';

var express = require('express');
var controller = require('./recordset.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/lastAddedDate', controller.lastAddedDate);
router.post('/', controller.create);
router.post('/filterByAttribution', controller.filterByAttribution);
router.delete('/', controller.deleteAll);
router.patch('/', controller.update);
router.patch('/attribution', controller.patchAttribution);
/*
router.get('/:id', controller.show);
router.put('/:id', controller.update);
*/

module.exports = router;