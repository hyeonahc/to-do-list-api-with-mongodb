import mongoose from 'mongoose'

const todoSchema = new mongoose.Schema({
  id: { type: String, required: [true] },
  text: { type: String, required: [true] },
})

export default mongoose.model('todo', todoSchema)
