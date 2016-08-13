module.exports = {
  attributes: {
    course: {
      model: "course"
    },
    title: {
      type: "string",
      maxLength:300
    },
    description: {
      type: "string",
      maxLength: 2000
    },
    slug: {
      type: "string",
      maxLength: 300,
      unique: true
    }
  }
};
