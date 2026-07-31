import { useState, useEffect } from "react";
import Nav from "./Nav";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";


const Main = ({ menu, isCollapsed, user }) => {
  const [response, setResponse] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const resetChat = () => {
    setResponse([]);
    setPrompt("");
    setLoading(false);
  };


  

 
  function menuCollapse() {
    if (window.innerWidth <= 960 && !isCollapsed) {
      menu();
    }
  }



  return (
    <>
      <Sidebar
        setResponse={setResponse}
        onNewChat={resetChat}
        isCollapsed={isCollapsed}
        menu={menu}
        user={user}
      />
      <div
        onClick={menuCollapse}
        className="relative flex h-screen w-full min-w-0 flex-col items-stretch overflow-hidden bg-white"
      >
        <Nav isCollapsed={isCollapsed} menu={menu} user={user} />
        <Outlet context={{ loading, setLoading, prompt, setPrompt, response, setResponse, resetChat }} />
      </div>
    </>
  );
};

export default Main;
