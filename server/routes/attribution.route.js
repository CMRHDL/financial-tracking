var Attr = require('../models/attributions');
var path = require('path');

module.exports = function(app) {
  // server routes ===========================================================
  // handle things like api calls
  // authentication routes

  // sample api route
  app.get('/api/attr', function(req, res) {
    Attr.find(function(err, attributions) {
      if (err) { 
        res.send(err);
      }
      res.json(attributions);
    });
  });
  app.post('/api/attr', function(req, res) {
    // console.log(req.body.name);
    var attr = new Attr({ name: req.body.name });
    attr.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json('meow');
    });
  });
  app.delete('/api/attr', function(req, res) {
    Attr.find({}).remove(function(err) {
      if (err) {
        res.send(err);
      }
      res.json('wuff');
    });
  });


  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve('client/index.html'));
    });

};

/*

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

*/