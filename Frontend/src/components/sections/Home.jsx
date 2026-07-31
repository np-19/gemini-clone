import { useOutletContext } from "react-router";
import InputBox from "../ui/InputBox";
import Chat from "./Chat";

const Home = ({ user }) => {
  const { loading, setLoading, prompt, setPrompt, response, setResponse } = useOutletContext();
  if (response.length > 0) return <Chat />;
  const name = user?.firstName ? `, ${user.firstName}` : "";

  return <main className="flex min-h-0 flex-1 flex-col bg-white">
    <section className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 pb-16 sm:px-8">
      <div className="max-w-xl">
        <span className="mb-5 inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-500">Your private thinking space</span>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-zinc-950 sm:text-5xl">What are you working on{name}?</h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-zinc-500">Ask for an explanation, turn a rough idea into a plan, or explore something new.</p>
      </div>
      <div className="mt-10"><InputBox setLoading={setLoading} prompt={prompt} setPrompt={setPrompt} response={response} setResponse={setResponse} /></div>
      <div className="mt-5 flex flex-wrap gap-2">
        {["Explain a concept", "Brainstorm ideas", "Help me write"].map((label) => <button key={label} onClick={() => setPrompt(label === "Explain a concept" ? "Explain " : label === "Brainstorm ideas" ? "Help me brainstorm ideas for " : "Help me write " )} className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-500 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-800">{label}</button>)}
      </div>
    </section>
  </main>;
};

export default Home;
