import {assets} from "../../assets/assets"
import { useNavigate } from "react-router";

const Nav = ({ menu, isCollapsed, user }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full z-10 h-15 p-4.5 relative">
    <div className={`fixed ${isCollapsed ? "inline-flex" : "hidden"} hover:bg-[rgba(255,255,255,0.1)] bigscreen:hidden top-3.5 left-4 z-20 justify-center items-center size-9 rounded-full`}>
     <img className='h-4 w-4 cursor-pointer' onClick={menu} src={assets.menu_icon} alt="" />
      </div>
      <h1 className="text-slate-500 text-[22px] bigscreen:absolute fixed left-16 bigscreen:left-6 font-medium top-1">Gemini</h1>
      <div className="text-slate-500 mt-2 rounded-full bigscreen:absolute bg-slate-200 text-sm fixed left-16 bigscreen:left-6 font-medium top-7">
        <span className="px-2 flex items-center justify-between">2.5 Flash 
          <span className="material-symbols-outlined">
            arrow_drop_down
          </span>
        </span>
      </div>
      {user ? (
        <div className="h-10 aspect-square rounded-full border-3 border-l-yellow-400 border-t-red-600 border-r-blue-700 border-b-green-500 absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center">
          <div className="h-8 aspect-square text-white rounded-full bg-slate-500 flex items-center justify-center">
            {user.firstName?.[0]?.toUpperCase() || "U"}
          </div>
        </div>
      ) : (
        <div className="absolute top-1/2 right-4 flex -translate-y-1/2 items-center gap-2">
          <button onClick={() => navigate("/login")} className="rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">Log in</button>
          <button onClick={() => navigate("/register")} className="rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700">Sign up</button>
        </div>
      )}
    </div>
  )
}

export default Nav
