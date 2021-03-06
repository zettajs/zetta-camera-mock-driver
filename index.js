var Device = require('zetta-device');
var util = require('util');
var extend = require('node.extend');

var IMAGE_URL_ROOT = 'http://www.zettaapi.org/icons/';
var IMAGE_EXTENSION = '.png';

var Camera = module.exports = function(cameraImage) {
  Device.call(this);
  this.cameraImage = cameraImage;
  this.style = extend(true, this.style, {properties: {}});
  this.style.actions = {'_update-state-image': {display: 'none'}};

  if (cameraImage) {
    this.style.properties.stateImage = {url: cameraImage, tintMode: "original"};
  } else {
    this.style.properties.stateImage = {url: "http://www.zettaapi.org/icons/camera-ready.png", tintMode: "template"};
  }
};
util.inherits(Camera, Device);

Camera.prototype.init = function(config) {
  config
    .name('Camera')
    .type('camera')
    .state('ready')
    .when('ready', {allow: ['make-not-ready', '_update-state-image']})
    .when('not-ready', {allow: ['make-ready', '_update-state-image']})
    .map('make-ready', this.makeReady)
    .map('make-not-ready', this.makeNotReady)
    .map('_update-state-image', this._updateStateImage);
};

Camera.prototype.makeReady = function(cb) {
  this.state = 'ready';
  this.call('_update-state-image');
  cb();
}

Camera.prototype.makeNotReady = function(cb) {
  this.state = 'not-ready'
  this.call('_update-state-image');
  cb();
}

Camera.prototype._updateStateImage = function(cb) {
  if (this.cameraImage && this.state === 'ready') {
    this.style.properties = extend(true, this.style.properties, {stateImage: {url: this.cameraImage, tintMode: 'original'}});
  } else {
    this.style.properties = extend(true, this.style.properties, {stateImage: {url: this._stateImageForCamera(), tintMode: 'template'}});
  }
  cb();
}

Camera.prototype._stateImageForCamera = function() {
  return IMAGE_URL_ROOT + 'camera-' + this.state + IMAGE_EXTENSION;
}

