/**
 * Stores:
 * – hero data,
 * – environment (mobile/desktop,
 * – scrolling state
 */
var Reflux = require("reflux");
var InjectActions = require("../mixins/inject-actions");
var MobileDetect = require("mobile-detect");
var DOM = require("./dom");

var Context = module.exports = Reflux.createStore({
  device: {
    vertical: null,
    width: null,
    height: null,
    mobile: null,
    phone: null,
    tablet: null
  },
  meta: {},

  user: null,

  mixins: [
    InjectActions({
      login: {},
      meta: {
        sync: true
      },
      updateDevice: {
        actionName: "upd",
        sync: true,
        preEmit(device, clean) {
          //on client side, do nothing
          if ("undefined" === typeof MobileDetect) return;

          if (device instanceof MobileDetect) return [{
            mobile: !!device.mobile(),
            phone: !!device.phone(),
            tablet: !!device.tablet(),

            //if phone, we count it as vertical since we dont have information on server-side
            vertical: !!device.phone()
          }, clean];
        }
      },
      refresh: {}
    })
  ],

  init: function() {
    var self = this;

    if ("undefined" !== typeof document) {
      DOM.listenToElementEvent(document, "keydown", function(event) {
        self.trigger("keydown", event.keyCode);
      });
    }
  },


  onRefresh() {
    this.trigger("refresh");
  },

  onLogin(user) {
    this.user = user;
    this.trigger("login");
  },

  onMeta(data) {
    _.extend(this.meta, data);
  },

  onUpdateDevice(device, clean) {
    var self = this;
    var old = _.omit(this.device, "width", "height");
    if (clean) {
      _.each(this.device, function(value, key) {
        self.device[key] = null;
      })
    }
    _.extend(this.device, device);
    if (this.device.height && this.device.width) {
      this.device.vertical = this.device.height > this.device.width;
    } else {
      this.device.vertical = null;
    }
//console.log(333, this.device);
    this.trigger("device");
    if (!_.isEqual(old, _.omit(this.device, "width", "height"))) {
      this.trigger("device.sufficient");
    }
    if (!_.isEqual(old, _.pick(this.device, "mobile", "phone", "tablet"))) {
      this.trigger("device.init");
    }
  }
});
