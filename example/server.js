var zetta = require('zetta');
var Camera = require('../index');
var style = require('./apps/style');

zetta()
  .use(Camera)
  .use(style)
  .listen(1337);
