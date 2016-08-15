module.exports = {
  name: {
    type: 'string',
    maxLength: 200
  },
  email: {
    type: "string",
    email: true,
    unique: true
  },
  passwordHash: {
    type: 'string'
  },
  slug: {
    type: 'string',
    maxLength: 300,
    unique: true
  }
};
