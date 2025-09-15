import Markdown from "../ui/Markdown"
import { useOutletContext, useParams, useNavigate } from "react-router";
import { useRef, useState, useEffect } from "react";
import { getChatData } from "../../services/apiServices";




const Chat = () => {
  const { response, setPrompt, setResponse, prompt } = useOutletContext();  
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();
  let { id } = useParams();
  id = id === "chat" ? null : id;



  async function getChat(chatId) {
    setResponse([]);
    try {
      navigate(`/app/${chatId}`);
      const paired = await getChatData(chatId);
      console.log(paired);
      setResponse(paired);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    async function fetchChat() {
      if (id) {
        await getChat(id);
      }
    }
    fetchChat();
  }, [id]);


  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response, loading]);

  
  const displayResponse = response.map((item, index) => {
    if (response.length === 0) return null;
    return (
      <Markdown
        key={index}
        item={item}
        loading={loading && index === response.length - 1}
      />
    );
  });
  return (
      <div className="relative border-box flex-1 w-full border-box flex h-full flex-col scrollbar-thumb-visible overflow-x-hidden overflow-y-scroll items-center justify-center">
        <div className='w-full box-border h-full flex justify-center flex-wrap pt-4 pb-20'>
          {displayResponse}
          <div className='w-full' ref={chatEndRef} />

        </div>

      </div>

  )
}

export default Chat;
