var util = require('util');
var extend = require('node.extend');
var detroitImage = 'http://www.zettaapi.org/public/demo/detroit.jpg';

module.exports = function(server) {
  ['camera'].forEach(function(deviceType){
    var deviceQuery = server.where({ type: deviceType});
    server.observe([deviceQuery], function(device) {
      var states = Object.keys(device._allowed);
      for (i = 0; i < states.length; i++) {
        device._allowed[states[i]].push('update-state-image');
      }
      device._transitions['update-state-image'] = {
        handler: function(updatedStateImage, cb) {
          this.style = extend(this.style, {stateImage: updatedStateImage});
          cb();
        },
        fields: [
          {name: 'image', type: 'text'}
        ]
      };

      device.call('update-state-image', detroitImage);
    });
  });
}