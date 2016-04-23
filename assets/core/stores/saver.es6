/**
 * Stores current overlay data
 */
var Reflux = require("reflux");
var InjectActions = require("../mixins/inject-actions");

var Saver = module.exports = Reflux.createStore({
  queue: [],

  dirty: false,
  dirtyDuringSaving: false,
  interval: null,
  status: null,
  lastOperationStatus: null,

  mixins: [
    InjectActions({
      startListening: {},
      add: {},
      urgent: {},
      _save: {
        sync: true,
        asyncResult: true
      }
    })
  ],

  onStartListening() {
    if (this.interval) return;
    this.interval = setInterval(this.checkQueue.bind(this), 2000);
  },

  checkQueue() {
    if (!this.queue.length || this.isSaving) return;

    this.Actions._save();
  },

  updateStatus(lastOperationStatus) {
    var status = null;

    if (lastOperationStatus) {
      this.lastOperationStatus = lastOperationStatus;
    }

    if (this.lastOperationStatus === "failed") {
      status = "failed";
    } else if (this.queue.length) {
      status = "saving";
    } else {
      status = "saved";
    }
    if (status !== this.status) {
      this.status = status;
      this.trigger("status", status);
    }
  },

  _compressQueue() {
    if (this.queue.length <= 1) return;

    var self = this, hash = {};
    this.queue.forEach((item, index) => {
      //new model requests can't be compressed
      if (!item || !item.id) return;
      if (self.isSaving && index === 0) return;

      var key = item.model + "-" + item.id;
      if (hash[key]) {
        _.extend(self.queue[hash[key]].data, item.data);
        self.queue[index] = null;
      } else {
        hash[key] = index;
      }
    });

    this.queue = _.filter(this.queue, item => !!item);
  },

  onAdd(model, id, data) {
    var item = "object" === typeof model
      ? model
      : {
        model: model,
        id: id,
        data: data
      };
    this.queue.push(item);
    this._compressQueue();
    this.updateStatus("saving");
  },

  onUrgent() {
    this.Actions.add.apply(this, arguments);
    this.checkQueue();
  },

  on_save() {
    var self = this;
    var item = this.queue[0];

    this.isSaving = true;

    this.updateStatus("saving");

    var fetchResult = item.id
      ? fetch("/api/" + item.model + "/" + item.id, {
          method: "put",
          body: JSON.stringify(item.data)
        })
      : fetch("/api/" + item.model, {
          method: "post",
          body: JSON.stringify(item.data)
        });

    fetchResult
      .then(response => response.ok
          ? response.json().then(
                buffer => self.Actions._save.completed(buffer, item),
                problem => self.Actions._save.failed(problem)
            )
          : self.Actions._save.failed(response)
      )

      .catch(this.Actions._save.failed);
  },

  on_saveCompleted(jsonResult, item) {
    this.queue.splice(0, 1);

    this.trigger("saved", jsonResult, item);

    if (!this.queue.length) {
      this.updateStatus("saved");
      this.isSaving = false;
    } else {
      this.Actions._save();
    }
  },

  on_saveFailed(err) {
    this.isSaving = false;
    this._compressQueue();
    this.updateStatus("failed");
  },

  getHumanReadableStatus() {
    switch(this.status) {
      case "published":
        return "Все изменения опубликованы";
      case "saved":
        return "Все изменения сохранены";
      case "saving":
        return "Сохранение...";
      case "failed":
        return "Не удалось сохранить изменения";
      default:
        return "";
    }
  }

  //onSetDirty(value) {
  //  if (null == value) value = true;
  //
  //  this[this.isSaving ? "dirtyDuringSaving" : "dirty"] = !!value;
  //
  //  this.updateStatus();
  //  this.trigger("source");
  //}
});
