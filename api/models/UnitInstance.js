module.exports = {
  attributes: {
    courseInstance: {
      model: "courseinstance"
    },
    unit: {
      model: "unit"
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