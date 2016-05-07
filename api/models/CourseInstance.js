module.exports = {
  attributes: {
    school: {
      model: "school"
    },
    course: {
      model: "course"
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
};