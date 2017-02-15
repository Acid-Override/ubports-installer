const path = require("path");
const utils = require("./utils.js")
const fastboot = utils.isSnap() ? "fastboot" : __dirname+"/android-tools/fastboot";
const sudo = utils.getSudo();

const options = {name: 'Ubports installer'}

var waitForDevice = (callback) => {
  callback()
}

// Due to limitations with sudo we combind the sudo.exec to one call to prevent
// seperate password prompts
var flash = (images, callback) => {
  var cmd="";
  images.forEach((image, l) => {
    cmd+=fastboot+" flash "+image.type+" "+image.path + "/" + path.basename(image.url);
    if(l !== images.length - 1)
      cmd+=" && "
  });
  sudo(cmd, options , (c) => {
    callback(c)
  });
}

module.exports = {
  flash: flash,
  waitForDevice: waitForDevice
}