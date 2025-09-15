import { useState, useRef, useEffect } from "react";

const TextArea = ({textareaRef, placeholder, prompt, promptInput}) => {
  const maxHeight = 200; // px

   useEffect(() => {
    if (textareaRef.current) {
      // Initialize height correctly on mount
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, maxHeight) + "px";
    }
  }, []);


  return (
    <>
      <textarea
        ref={textareaRef}
        onInput={promptInput}
        value={prompt}
        placeholder={placeholder}
        className="w-full
                  min-h-[40px]
                  max-h-[200px]
                  overflow-y-auto
                  resize-none
                  scrollbar-thumb-visible
                  p-2
                  border-0
                  text-base
                  leading-relaxed
                  rounded-lg
                  focus:outline-none
               "
        rows={1}
      />
    </>
  );
};

export default TextArea;
