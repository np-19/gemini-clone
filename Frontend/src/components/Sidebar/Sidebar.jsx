import Top from './Top'
import { useRef, useState, useEffect } from "react";
import Recent from './Recent'
import {assets} from '../../assets/assets'
import {getAccessToken} from "../../helper/authToken"

const Sidebar = ({menu,isCollapsed, getChat, setResponse}) => {
  const divRef = useRef(null);
  let [data, setData] = useState([]);

async function getChatTitle(){
    try {
     const accessToken = getAccessToken();
    const response = await fetch('/api/chats/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
  }
    );
    if (!response.ok) throw new Error('Failed to fetch chats');
    return await response.json();
  } catch (err) {
    console.error(err);
    return { titles: [] };
  }
}


useEffect(()=>{
  getChatTitle().then((data)=>{
    if(!data.titles) return;
    setData(data.titles)    
  })
}, [])




  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    setScrolling(true);

    // hide scrollbar after 1s of inactivity
    clearTimeout(divRef.current.hideTimeout);
    divRef.current.hideTimeout = setTimeout(() => {
      setScrolling(false);
    }, 1000);
  };


  return (
    <div onScroll={handleScroll} className={"bigscreen:relative absolute top-0 left-0 z-50 flex bigscreen:z-30 flex-col h-screen box-border bg-slate-300 transition-all duration-300 ease-in-out " + (isCollapsed ? 'bigscreen:w-18 w-0 px-0 bigscreen:pl-4' : 'bigscreen:w-68 bigscreen:pl-4 w-75/100')}>
      <Top setResponse={setResponse} isCollapsed={isCollapsed} menu={menu} />
      <div ref={divRef} onScroll={handleScroll} className={`overflow-y-scroll ${scrolling ? "scrollbar-thumb-visible" : "scrollbar-thumb-hidden" } overflow-x-hidden h-auto flex-1 w-full`}>
      <Recent getChat={getChat} data={data} isCollapsed={isCollapsed} />
      </div>
     { /*Settings */}


      <div className={"z-1000 h-18 box-border pr-4 w-full flex items-start justify-center"}>
        <div className={"relative py-2 mt-4 box-border w-full px-2 rounded-full cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition flex items-center"}>
              <img className='h-5' src={assets.settings_icon} alt="" />
              <span className={'ml-3 text-sm text-nowrap truncate transition-all duration-300 ease-in-out ' + (isCollapsed ? ' w-0' : ' w-full')}>Settings and help</span>
          </div>
      </div>
      
    </div>
  )
}

export default Sidebar
