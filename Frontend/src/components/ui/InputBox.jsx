import TextArea from "./TextArea"
import {assets} from '../../assets/assets'
import { useRef, useState} from "react";
import { getAccessToken } from "../../helper/authToken";
import { newChat, updateChat, enhancePrompt } from "../../services/apiServices";
import { useNavigate, useParams } from "react-router";
//props: prompt, setPrompt, response, setResponse, setLoading
//props are the variables passed down from the parent component (App.jsx) to manage the state of the input box and handle interactions with the Gemini API.
const InputBox = ({prompt, setPrompt, response, setResponse, setLoading}) => {
  const {id} = useParams();
  const [enhancing, setEnhancing] = useState(false);

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

  const handleEnhancePrompt = async () => {
    if (prompt.trim() === "" || enhancing) return;
    
    setEnhancing(true);
    try {
      const enhanced = await enhancePrompt(prompt);
      setPrompt(enhanced);
      
      // Auto-adjust textarea height for enhanced prompt
      if (textareaRef.current) {
        const maxHeight = 200;
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, maxHeight) + "px";
      }
    } catch (err) {
      console.error("Failed to enhance prompt:", err);
    } finally {
      setEnhancing(false);
    }
  };


  
  return (
    <div className="max-w-[758px] z-30 w-95/100 min-h-[108px] max-h-[432px] px-6 py-4 border-[1px] border-[#DADADA] bg-[rgba(255,255,255,1)] rounded-3xl flex flex-col">
        <TextArea textareaRef={textareaRef} promptInput={promptInput} prompt={prompt} placeholder={"Ask Gemini"} />
        <div className="h-12 grid grid-cols-3 items-center">
          <div className="size-9 col-start-1 col-end-2 rounded-full hover:bg-neutral-300 flex justify-center items-center">
            <img src={assets.plus_icon} className="h-5 brightness-0 cursor-pointer" alt="" />
          </div>
          <div className="col-start-2 col-end-3 flex justify-center items-center gap-2">
            <button
              onClick={handleEnhancePrompt}
              disabled={enhancing || prompt.trim() === ""}
              className={`group relative size-10 rounded-full flex justify-center items-center transition-all duration-200 ${
                enhancing
                  ? "bg-purple-100 cursor-wait"
                  : prompt.trim() === ""
                  ? "bg-neutral-100 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg hover:scale-105 cursor-pointer"
              }`}
              title="Enhance prompt"
            >
              {enhancing ? (
                <svg className="animate-spin h-5 w-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <img 
                  src={assets.sparkle_icon} 
                  className={`h-5 transition-all ${
                    prompt.trim() === "" ? "brightness-0 opacity-50" : "brightness-0 invert"
                  }`}
                  alt="Enhance" 
                />
              )}
              {!enhancing && prompt.trim() !== "" && (
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  Enhance prompt
                </span>
              )}
            </button>
          </div>
          <div onClick={getData} className="size-10 col-start-3 pl-1 cursor-pointer col-end-4 place-self-end rounded-full hover:bg-neutral-300 bg-neutral-200 flex justify-center items-center">
            <img src={assets.send_icon} className="h-5 brightness-0 " alt="" />
          </div>
        </div>
      </div>
  )
}

export default InputBox