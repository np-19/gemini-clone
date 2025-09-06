import {useRef, useState} from 'react'

const Recent = ({isCollapsed, data, getChat}) => {
  let [deleteButton , setDeleteButton] = useState(false);

  const handleClick = async (chatId) => {
    await getChat(chatId)
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
  

  return (
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

      </div>
  )
}

export default Recent
