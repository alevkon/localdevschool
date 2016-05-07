var Reflux = require("reflux");

var DOM = module.exports = Reflux.createStore({
  listenToElementEvent: function(element, event, handler) {
    if(element.addEventListener)
      element.addEventListener(event, handler, false);
    else if (element.attachEvent)
      element.attachEvent("on" + event, handler);
  },

  unlistenToElementEvent(element, event, handler) {
    if(element.addEventListener)
      element.removeEventListener(event, handler, false);
    else if (element.attachEvent)
      element.detachEvent("on" + event, handler);
  },

  getElementPosition(obj) {
    var curleft = curtop = 0;
    if (obj.offsetParent) {
      do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
      } while (obj = obj.offsetParent);
    }
    return [curleft, curtop];
  },
});
