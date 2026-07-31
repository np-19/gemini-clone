import TextArea from "./TextArea";
import { useRef } from "react";
import { getAccessToken } from "../../helper/authToken";
import { newChat, updateChat } from "../../services/apiServices";
import { useNavigate, useParams } from "react-router";

const InputBox = ({ prompt, setPrompt, response, setResponse, setLoading }) => {
  const { id } = useParams();
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  const saveUrl = response.length > 0 ? `/api/chats/${id}/save` : "/api/chats/new/save";
  const promptInput = (event) => { setPrompt(event.target.value); event.target.style.height = "auto"; event.target.style.height = `${Math.min(event.target.scrollHeight, 200)}px`; };
  const getData = async (event) => {
    event.preventDefault();
    const submittedPrompt = prompt.trim();
    if (!submittedPrompt) return;
    setResponse((items) => [...items, { prompt: submittedPrompt, content: "" }]);
    setPrompt("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setLoading(true);
    try {
      const reply = await newChat(submittedPrompt, response);
      setResponse((items) => items.map((item, index) => index === items.length - 1 ? { ...item, content: reply.text } : item));
      if (getAccessToken()) { const data = await updateChat(saveUrl, submittedPrompt, reply); navigate(`/app/${data.chatId}`); }
    } catch (error) {
      setResponse((items) => items.map((item, index) => index === items.length - 1 ? { ...item, content: "Sorry, I couldn't complete that request." } : item));
      console.error(error);
    } finally { setLoading(false); }
  };
  return <form onSubmit={getData} className="rounded-2xl border border-zinc-300 bg-white p-2 shadow-[0_12px_30px_rgba(24,24,27,0.08)] transition focus-within:border-zinc-400 focus-within:shadow-[0_12px_30px_rgba(24,24,27,0.12)]">
    <TextArea textareaRef={textareaRef} promptInput={promptInput} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) getData(event); }} prompt={prompt} placeholder="Ask anything" />
    <div className="flex items-center justify-between px-1 pb-1"><span className="pl-2 text-xs text-zinc-400">Press Enter to send</span><button type="submit" aria-label="Send message" disabled={!prompt.trim()} className="flex size-9 items-center justify-center rounded-xl bg-zinc-900 text-base text-white transition hover:bg-zinc-700 disabled:bg-zinc-200 disabled:text-zinc-400">↑</button></div>
  </form>;
};
export default InputBox;
