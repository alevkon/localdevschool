module.exports = {
  constants: {
    STUDENT_STATUS: {
      WORKING: 10,
      READY: 20
    },
    MENTOR_STATUS: {
      REVIEW: 10,
      CLOSED: 20
    }
  },
  attributes: {
    taskInstance: {
      model: "taskInstance"
    },
    student: {
      model: "user"
    },
    studentStatus: {
      type: "integer",
      defaultsTo: 10
    },
    mentorStatus: {
      type: "integer",
      defaultsTo: 10
    }
  }
}