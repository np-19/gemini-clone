import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

const Markdown = ({ item, loading }) => {
  const components = {
    code({ inline, className, children, ...props }) {
      const language = /language-(\w+)/.exec(className || "")?.[1];
      return !inline && language ? <CodeBlock language={language}>{String(children).replace(/\n$/, "")}</CodeBlock> : <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[0.9em]" {...props}>{children}</code>;
    },
    h1: (props) => <h1 className="mb-3 mt-7 text-2xl font-semibold tracking-tight text-zinc-900" {...props} />,
    h2: (props) => <h2 className="mb-3 mt-6 text-xl font-semibold tracking-tight text-zinc-900" {...props} />,
    h3: (props) => <h3 className="mb-2 mt-5 text-base font-semibold text-zinc-900" {...props} />,
    p: (props) => <p className="my-3 leading-7 text-zinc-700" {...props} />,
    ul: (props) => <ul className="my-3 list-disc space-y-1.5 pl-5 text-zinc-700" {...props} />,
    ol: (props) => <ol className="my-3 list-decimal space-y-1.5 pl-5 text-zinc-700" {...props} />,
    blockquote: (props) => <blockquote className="my-4 border-l-2 border-zinc-300 pl-4 text-zinc-500" {...props} />,
    table: (props) => <div className="my-4 overflow-x-auto"><table className="w-full text-left text-sm" {...props} /></div>,
    th: (props) => <th className="border-b border-zinc-200 px-3 py-2 font-medium text-zinc-900" {...props} />,
    td: (props) => <td className="border-b border-zinc-100 px-3 py-2 text-zinc-600" {...props} />,
  };
  return <article className="w-full py-5 sm:py-7">
    {item.prompt && <div className="flex justify-end"><p className="max-w-[85%] rounded-2xl rounded-br-md bg-zinc-100 px-4 py-3 text-[15px] leading-6 text-zinc-800">{item.prompt}</p></div>}
    <div className="mt-6 flex gap-3 sm:gap-4"><div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-zinc-900 text-xs font-semibold text-white">N</div><div className="min-w-0 flex-1 text-[15px]">{loading ? <div className="flex gap-1 pt-2"><span className="size-1.5 animate-bounce rounded-full bg-zinc-400" /><span className="size-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:150ms]" /><span className="size-1.5 animate-bounce rounded-full bg-zinc-400 [animation-delay:300ms]" /></div> : item.content && <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>{item.content}</ReactMarkdown>}</div></div>
  </article>;
};
export default Markdown;
