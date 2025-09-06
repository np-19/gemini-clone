import TextArea from "./TextArea"
import {assets} from '../../assets/assets'
const InputBox = ({promptInput, prompt, getData}) => {

  
  return (
    <div className="max-w-[758px] z-30 w-95/100 min-h-[108px] max-h-[432px] px-6 py-4 border-[1px] border-[#DADADA] bg-[rgba(255,255,255,1)] rounded-3xl flex flex-col">
        <TextArea promptInput={promptInput} prompt={prompt} placeholder={"Ask Gemini"} />
        <div className="h-12 grid grid-cols-3 items-center">
          <div className="size-9 col-start-1 col-end-2 rounded-full hover:bg-neutral-300 flex justify-center items-center">
            <img src={assets.plus_icon} className="h-5 brightness-0 cursor-pointer" alt="" />
          </div>
          <div onClick={getData} className="size-10 col-start-3 pl-1 cursor-pointer col-end-4 place-self-end rounded-full hover:bg-neutral-300 bg-neutral-200 flex justify-center items-center">
            <img src={assets.send_icon} className="h-5 brightness-0 " alt="" />
          </div>
        </div>
      </div>
  )
}

export default InputBox