module.exports = {
  attributes: {
    author: {
      model: "author"
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
      type: 'string',
      maxLength: 300,
      unique: true
    }
  }
};
