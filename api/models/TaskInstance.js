module.exports = {
  attributes: {
    task: {
      model: "task"
    },
    unitInstance: {
      model: "unitInstance"
    },
    title: {
      type: "string",
      maxLength: 300
    },
    description: {
      type: "string",
      maxLength: 2000
    }
  }
}