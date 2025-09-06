import mongoose from 'mongoose';

const partSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'image', 'audio', 'video'], // extensible
    default: 'text'
  },
  text: String,
  url: String, // for image/audio/video if needed
}, { _id: false });

const messageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'model'],
    required: true,
  },
  parts: [partSchema],
}, { _id: false, timestamps: true });

const chatSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, 
  title: { type: String, default: 'New Chat' },
  history: [messageSchema],
}, { timestamps: true });

const Chat = mongoose.model('Chat', chatSchema);

export default Chat;
