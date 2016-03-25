var zetta = require('zetta');
var Camera = require('../index');

zetta()
  .use(Camera, 'http://www.zettaapi.org/public/demo/detroit.jpg')
  .link('http://dev.zettaapi.org')
  .listen(1337);
