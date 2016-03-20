var Device = require('zetta-device');
var util = require('util');

var Camera = module.exports = function() {
  Device.call(this);
};
util.inherits(Camera, Device);

Camera.prototype.init = function(config) {
  config
    .name('Camera')
    .type('camera')
    .state('ready')
    .when('ready', {allow: ['make-not-ready']})
    .when('not-ready', {allow: ['make-ready']})
    .map('make-ready', this.makeReady)
    .map('make-not-ready', this.makeNotReady);
    
};


Camera.prototype.makeReady = function(cb) {
  this.state = 'ready';
  cb();
}

Camera.prototype.makeNotReady = function(cb) {
  this.state = 'not-ready'
  cb();
}
