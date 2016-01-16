'use strict';

var express = require('express');
var controller = require('./setting.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
/*
router.get('/:id', controller.show);
router.put('/:id', controller.update);
*/

module.exports = router;