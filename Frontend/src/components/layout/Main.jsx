import { useState, useEffect } from "react";
import Nav from "./Nav";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";


const Main = ({ menu, isCollapsed, children }) => {
  const [response, setResponse] = useState([]);
  const [prompt, setPrompt] = useState("");

 
  function menuCollapse() {
    if (window.innerWidth <= 960 && !isCollapsed) {
      menu();
    }
  }



  return (
    <>
      <Sidebar
        setResponse={setResponse}
        isCollapsed={isCollapsed}
        menu={menu}
      />
      <div
        onClick={menuCollapse}
        className="flex pb-6 relative flex-col h-screen items-center w-full z-10 bigscreen:flex-1 justify-between scrollbar-thumb-hidden"
      >
        <Nav isCollapsed={isCollapsed} menu={menu} />
        <Outlet context={{ response, setResponse, prompt, setPrompt, setResponse}} />
      </div>
    </>
  );
};

export default Main;