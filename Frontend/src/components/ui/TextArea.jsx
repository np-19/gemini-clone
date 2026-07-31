import { useEffect } from "react";

const TextArea = ({ textareaRef, placeholder, prompt, promptInput, onKeyDown }) => {
  useEffect(() => {
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }, [textareaRef]);

  return <textarea ref={textareaRef} onInput={promptInput} onKeyDown={onKeyDown} value={prompt} placeholder={placeholder} rows={1}
    className="min-h-12 w-full resize-none bg-transparent px-1 py-3 text-[15px] leading-6 text-zinc-900 outline-none placeholder:text-zinc-400" />;
};

export default TextArea;
