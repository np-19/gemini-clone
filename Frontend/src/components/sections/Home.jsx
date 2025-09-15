import { useOutletContext } from "react-router";
import InputBox from "../ui/InputBox";
import Chat from "./Chat";


const Home = ({ user }) => {
    const { prompt, setPrompt, response, setResponse } = useOutletContext();



    if (response.length > 0) {
        return (
            <Chat />
        );
        
    }



    return (
        <div className="absolute top-0 left-0 h-screen w-full border-box flex flex-col items-center justify-center pb-15">
               <div className="w-full h-auto flex flex-col items-center justify-start">
                 <h1 className="text-4xl text-center mb-10 w-9/10 bg-gradient-to-r from-red-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                {
                !user ? <>Meet Gemini<br />Your Personal AI Assistant</>
                : <>Hello, {user.firstName}</>
                }
            </h1>
            <div className="w-full bigscreen:relative absolute bigscreen:bottom-0 flex animate-input bigscreen:animate-none flex-col items-center">
                <InputBox prompt={prompt} setPrompt={setPrompt} response={response} setResponse={setResponse}  />
            </div>
            </div>

        </div>
    );

};

export default Home;