const mongoose = require('mongoose')
const Comment = require('./comment')
const Schema = mongoose.Schema

const PostSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  title: { type: String, required: true },
  url: { type: String, required: true },
  subunreddit: { type: String, required: true },
  summary: { type: String, required: true },
  comments: [Comment.schema],
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }
})

PostSchema.pre('save', function(next) {
  const now = new Date()
  this.updatedAt = now

  if (!this.createdAt) {
    this.createdAt = now
  }

  next()
})

module.exports = mongoose.model('Post', PostSchema)
