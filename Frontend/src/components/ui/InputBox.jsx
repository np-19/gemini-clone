import TextArea from "./TextArea"
import {assets} from '../../assets/assets'
import { useRef } from "react";
import { getAccessToken } from "../../helper/authToken";
import { newChat, updateChat } from "../../services/apiServices";
import { useNavigate, useParams } from "react-router";
//props: prompt, setPrompt, response, setResponse, setLoading
//props are the variables passed down from the parent component (App.jsx) to manage the state of the input box and handle interactions with the Gemini API.
const InputBox = ({prompt, setPrompt, response, setResponse, setLoading}) => {
  const {id} = useParams();
  const textareaRef = useRef(null);
  const navigate = useNavigate();
  let url = response.length > 0 ? `/api/chats/${id}/save` : "/api/chats/new/save";

 const promptInput = (e) => {
    const maxHeight = 200;
    setPrompt(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto"; // reset
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
  };

    const getData = async (e) => {
    e.preventDefault();

    if (prompt.trim() === "") return;
    setResponse((prevResponse) => {
      const updated = [...prevResponse, { prompt, content: "" }];
      return updated;
    });
    setPrompt("");
    if (textareaRef.current)
    textareaRef.current.style.height = "auto";
    setLoading(true);

    try {
      const reply = await newChat(prompt, response);
      console.log(reply);
      
      // Update content with response from API
      setResponse((prevResponse) => {
        const updated = [...prevResponse];
        updated[updated.length - 1].content = reply.text;
        return updated;
      });

      if (getAccessToken()) {
        const data = await updateChat(url, prompt, reply);
        navigate(`/app/${data.chatId}`);
      }
    } catch (err) {
      console.error(err);
      // Handle error gracefully
      setResponse((prevResponse) => {
        const updated = [...prevResponse];
        updated[updated.length - 1].content =
          "Sorry, an error occurred while fetching the response.";
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="max-w-[758px] z-30 w-95/100 min-h-[108px] max-h-[432px] px-6 py-4 border-[1px] border-[#DADADA] bg-[rgba(255,255,255,1)] rounded-3xl flex flex-col">
        <TextArea textareaRef={textareaRef} promptInput={promptInput} prompt={prompt} placeholder={"Ask Gemini"} />
        <div className="h-12 flex items-center justify-between">
          <div className="size-9 rounded-full hover:bg-neutral-300 flex justify-center items-center">
            <img src={assets.plus_icon} className="h-5 brightness-0 cursor-pointer" alt="" />
          </div>
          <button type="button" onClick={getData} className="size-10 cursor-pointer rounded-full bg-neutral-200 pl-1 hover:bg-neutral-300 flex justify-center items-center">
            <img src={assets.send_icon} className="h-5 brightness-0 " alt="" />
          </button>
        </div>
      </div>
  )
}

export default InputBox
