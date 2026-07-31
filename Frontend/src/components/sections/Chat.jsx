import Markdown from "../ui/Markdown"
import { useOutletContext, useParams } from "react-router";
import { useRef, useEffect } from "react";
import { getChatData } from "../../services/apiServices";
import InputBox from "../ui/InputBox";




const Chat = () => {
  const { loading, setLoading, response, setPrompt, setResponse, prompt } = useOutletContext();  
  const chatEndRef = useRef(null);
  let { id } = useParams();
  id = id === "chat" ? null : id;



  async function getChat(chatId) {
    setResponse([]);
    try {
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
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "start" , });
    }
  }, [response]);

  
  const displayResponse = response.map((item, index) => {
    if (response.length === 0) return null;
    return (
     <div key={`${item.prompt}-${index}`}>
      <Markdown item={item} loading={index === response.length - 1 && loading } />
      {index === response.length - 1 && <div ref={chatEndRef} />}
      </div>
    );
  });
  return (
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-white">
        <div className="flex-1 overflow-y-auto">
        <div className='mx-auto flex w-full max-w-4xl flex-col divide-y divide-zinc-100 px-5 pb-8 pt-2 sm:px-8'>
          {displayResponse}
        </div>

      </div>
      <div className="border-t border-zinc-100 bg-white px-4 py-3">
        <div className="mx-auto w-full max-w-4xl">
                <InputBox setLoading={setLoading} prompt={prompt} setPrompt={setPrompt} response={response} setResponse={setResponse}  />
        </div>
            </div>
      </div>

  )
}

export default Chat;
