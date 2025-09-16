import { Router } from "express";
import Chat from "../models/Chat.js";
import { protect } from "../middlewares/auth.js";
import { getResponse } from "../utils/gemini.js";
import mongoose from "mongoose";

const router = Router();




router.get("/",protect,  async (req, res) => {
  try {
    const chats = await Chat.find({
      user: req.user._id,
    })
  .sort({ createdAt: -1 });
  if (chats.length === 0) return res.status(404).json("No chats found");
    const titles = chats.map((chat) => {
      return {
        chatId: chat._id,
        title: chat.title,
      };
    });
    res.json({ titles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.route("/new")
.post(async (req, res) => {
const { prompt, response } = req.body;
try {
  const result = await getResponse(prompt, response);
  console.log(result);
  return res.json({ result });
}catch(err){
  res.status(500).json({ error: err.message });
}  
});


router.route('/new/save')
.post(protect, async (req, res) => {
  const { prompt, reply } = req.body;
  
  try {
    const chat = new Chat({
      user: req.user._id,
      title: "New Chat",
      history: [{
        role: "user",
        parts: [{
          text: prompt,
        }],
      }, {
        role: "model",
        parts: [{
          text: reply.text,
        }],
      }],
    });    
    const titlePrompt = 'Generate a Chatgpt or Gemini style 4 5 words title for this prompt: ' + prompt +
     'only include the title and nothing else. no extra symbols or characters'
    const {text: title} = await getResponse(titlePrompt)
    chat.title = title
    
    await chat.save();
    res.json({message: "Chat saved successfully", chatId: chat._id});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})


router.route('/:id')
.get(protect, async (req, res) => {
    const {id} = req.params
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: "Invalid Chat ID format" });
    }
    try {
        const chat = await Chat.findById(id)
        if(!chat) return res.status(404).json({error: "Chat not found"})
        res.json({ _id: chat._id, history: chat.history });
    } catch (err) {

      res.status(500).json({ error: err.message });
        
    }
}
)

router.route('/:id/save').post(async (req, res) => {
  const {id} = req.params
  const {prompt, reply} = req.body
  try {
    const chat = await Chat.findById(id)
    chat.history.push({
      role: "user",
      parts: [{
        text: prompt,
      }],
    })
    chat.history.push({
      role: "model",
      parts: [{
        text: reply.text,
      }],
    })
    await chat.save()
    res.json({message: "new message added to chat successfully", chatId: chat._id})
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.route('/:id/delete')
.delete(async (req, res) => { 
  const {id} = req.params
  try {
    await Chat.findByIdAndDelete(id)
    res.json({message: "chat deleted successfully"})
  }catch (err) {
    res.status(500).json({ error: err.message })
  }
}

)





export default router;
