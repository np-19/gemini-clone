import { useNavigate } from 'react-router';
import {assets} from '../../assets/assets'



const SidebarNav = ({isCollapsed, menu, setResponse}) => {
  const navigate = useNavigate();
  function newChat(){
    navigate('/app')
    setResponse([])
     if(!isCollapsed) menu()
  }

 


  return (
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
    </div>
  )
}

export default SidebarNav;
