import { useState, useEffect, useRef } from "react";
import Markdown from "./Markdown";
import Nav from "../Nav/Nav";
import { useNavigate, useParams } from "react-router";
import InputBox from "./InputBox";
import Sidebar from "../Sidebar/Sidebar";
import { getAccessToken } from "../../helper/authToken";
import { getChatData, newChat, updateChat } from "../../services/apiFetch";

const Main = ({ menu, isCollapsed, children }) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const chatEndRef = useRef(null);
  let { id } = useParams();
  id = id === "chat" ? null : id;
  let url = id ? `/api/chats/${id}/save` : "/api/chats/new/save";

  useEffect(() => {
    async function fetchChat() {
      if (id) {
        await getChat(id);
      }
    }
    fetchChat();
  }, [id]);

  async function getChat(chatId) {
    setResponse([]);
    try {
      navigate(`/app/${chatId}`);
      const paired = await getChatData(chatId);
      setResponse(paired);
    } catch (err) {
      console.log(err);
    }
  }

  const getData = async (e) => {
    e.preventDefault();

    if (prompt.trim() === "") return;

    // Optimistic UI Update (Add prompt immediately)
    setResponse((prevResponse) => {
      const updated = [...prevResponse, { prompt, content: "" }];
      return updated;
    });
    setPrompt("");
    e.target.parentElement.parentElement.parentElement.children[0].style.height =
      "auto";
    setLoading(true);

    try {
      const reply = await newChat(prompt, response);
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

  const promptInput = (e) => {
    const maxHeight = 200;
    setPrompt(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto"; // reset
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + "px";
  };

  function menuCollapse() {
    if (window.innerWidth <= 960 && !isCollapsed) {
      menu();
    }
  }

  // Scroll to bottom whenever new messages or loading is changed
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [response, loading]); // Crucial Dependency

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
    <>
      <Sidebar
        setResponse={setResponse}
        getChat={getChat}
        isCollapsed={isCollapsed}
        menu={menu}
      />

      <div
        onClick={menuCollapse}
        className="flex relative pb-6 flex-col h-screen scrollbar-thumb-hidden items-center w-full z-10 bigscreen:flex-1 justify-between"
      >
        <Nav isCollapsed={isCollapsed} menu={menu} />

        {/* Chat area */}
        <div className="w-full py-10 flex h-auto flex-1 justify-center overflow-y-scroll scrollbar-thumb-hidden overflow-x-hidden relative">
          <div className="w-9/10 relative max-w-[758px]">
            {response.length === 0 ? (
              <div className="flex flex-col items-center justify-center w-full">
                {children}
              </div>
            ) : (
              displayResponse
            )}
            <div ref={chatEndRef} />
          </div>
        </div>

        <InputBox promptInput={promptInput} getData={getData} prompt={prompt} />
      </div>
    </>
  );
};

export default Main;