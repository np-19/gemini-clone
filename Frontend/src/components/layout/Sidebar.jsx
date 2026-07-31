import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { apiFetch } from "../../helper/apiFetch";

const Sidebar = ({ isCollapsed, setResponse, user, onNewChat }) => {
  const navigate = useNavigate();
  const [chats, setChats] = useState([]);
  useEffect(() => {
    if (!user) return setChats([]);
    apiFetch("/api/chats/").then((res) => res.json()).then((data) => setChats(data.titles || [])).catch(() => setChats([]));
  }, [user]);
  const newChat = () => { onNewChat(); navigate("/app"); };

  return <aside className={`relative z-20 hidden h-screen shrink-0 border-r border-zinc-200 bg-zinc-50 transition-all lg:flex lg:flex-col ${isCollapsed ? "w-0 overflow-hidden border-r-0" : "w-64"}`}>
    <div className="p-4"><button onClick={newChat} className="flex w-full items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2.5 text-left text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-100"><span className="text-lg leading-none">+</span> New chat</button></div>
    <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-4">
      <p className="px-2 pb-2 pt-3 text-xs font-medium uppercase tracking-wider text-zinc-400">Recent</p>
      {chats.map((chat) => <button key={chat.chatId} onClick={() => { setResponse([]); navigate(`/app/${chat.chatId}`); }} className="mb-1 w-full truncate rounded-lg px-3 py-2 text-left text-sm text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900">{chat.title}</button>)}
      {user && chats.length === 0 && <p className="px-3 pt-2 text-sm text-zinc-400">No saved chats yet.</p>}
    </div>
    <p className="p-5 text-xs text-zinc-400">Nexus</p>
  </aside>;
};

export default Sidebar;
