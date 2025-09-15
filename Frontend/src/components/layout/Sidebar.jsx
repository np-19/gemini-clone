import { useRef, useState, useEffect } from "react";
import {assets} from '../../assets/assets'
import { useNavigate } from 'react-router';
import {getAccessToken} from "../../helper/authToken"

const Sidebar = ({menu,isCollapsed,setResponse}) => {
  const divRef = useRef(null);
  let [data, setData] = useState([]);

    const navigate = useNavigate();
  function newChat(){
    navigate('/app')
    setResponse([])
     if(!isCollapsed) menu()
  }

   let [deleteButton , setDeleteButton] = useState(false);

  const handleClick = async (chatId) => {
    navigate(`/app/${chatId}`);
    setResponse([])
     if(!isCollapsed) menu()
  }
  

  const handleDelete = async (chatId) => {
  }
  const handleMouse = (e) => {
    e.stopPropagation();
    setDeleteButton(true);
    setTimeout(() => {
      setDeleteButton(false);
    }, 200);
    
  }

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
    <div onScroll={handleScroll} className={"bigscreen:relative absolute z-50 flex bigscreen:z-30 flex-col h-screen box-border bg-slate-300 transition-all duration-300 ease-in-out " + (isCollapsed ? 'bigscreen:w-18 w-0 px-0 bigscreen:pl-4' : 'bigscreen:w-68 bigscreen:pl-4 w-75/100')}>
    <div className={`w-full relative pb-2 pr-4`}>
      <div className='h-21 relative w-full px-2'>
        <div className='w-full relative h-9 rounded-full bigscreen:hidden top-3.5 bg-[rgba(255,255,255,0.1)] flex justify-center items-center'>
          <input type="text" placeholder='Search for chats' className='text-[#1f1f1f] text-sm w-7/10 h-full focus:outline-none' />
        </div>
        <div className={`fixed hidden bigscreen:flex hover:bg-[rgba(255,255,255,0.1)] filter top-3.5 left-4 justify-center items-center size-9 rounded-full`}>
     <img className='h-4 w-4 cursor-pointer' onClick={menu} src={assets.menu_icon} alt="" />
  </div>
        <div className={'absolute left-4 transition-all duration-300 ease-in-out translate-x-0 hover:bg-[rgba(255,255,255,0.1)] top-3.5 flex justify-center items-center h-9 bigscreen:translate-x-[525%] rounded-full' + (isCollapsed ? ' w-0' : ' w-9' )}>
            <img className={'h-4 w-4 cursor-pointer'} src={assets.search_icon} alt="" />
        </div>
      </div>
      <div onClick={newChat} className='py-2 px-2.5 w-full cursor-pointer hover:bg-[rgba(255,255,255,0.1)] rounded-full flex items-center'>
        <img className={`max-w-5 ${isCollapsed ? 'hidden bigscreen:inline-block' : 'inline-block'} `} src={assets.newchat_icon} alt="" />
        <p className={'ml-3 text-sm text-nowrap truncate transition-all duration-300 ease-in-out ' + (isCollapsed ? ' w-0' : ' w-full')}>New Chat</p>
      </div>
    </div>      <div ref={divRef} onScroll={handleScroll} className={`overflow-y-scroll ${scrolling ? "scrollbar-thumb-visible" : "scrollbar-thumb-hidden" } overflow-x-hidden h-auto flex-1 w-full`}>
<div className={'relative pr-2 h-76 mt-6 transition-all duration-300 ease-in-out' + (isCollapsed ? ' w-0' : ' w-full')}>
        <h1 className='text-gray-500 mx-2.5 text-nowrap truncate text-sm font-bold'>Recent</h1>
        {
          data.map((item) => {
            return <div key={item.chatId} onClick={()=>handleClick(item.chatId)} className="mt-2 py-2 rounded-full cursor-pointer hover:bg-[rgba(255,255,255,0.1)] transition justify-between flex items-center">
                      <span className='inline-block ml-3 text-nowrap truncate text-sm'>{item.title}</span>
                      <span onMouseEnter={handleMouse} onClick={()=>handleDelete(item.chatId)} className={`text-sm hover:cursor-pointer hover:scale-110 ${deleteButton ? 'block' : 'hidden'} `}><i className="fa-solid fa-ellipsis-vertical"></i></span>
          </div>
          })
        }

      </div>      </div>
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
