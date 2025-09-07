import mongoose from 'mongoose';

const inlineDataSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
}, { _id: false });


const partSchema = new mongoose.Schema({
  text: String,
  inlineData: inlineDataSchema,
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
