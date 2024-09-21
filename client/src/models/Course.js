const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  subjectArea: { type: String, required: true },
  credits: { type: Number, required: true },
  teacherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
});

module.exports = mongoose.model('Course', courseSchema);