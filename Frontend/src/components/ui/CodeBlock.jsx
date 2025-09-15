// src/components/CodeBlock.jsx

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// SVG Icons (You can place these in a separate assets file if preferred)
const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v2.25H4.5v-10.5h11.25V17.25zm-1.5 0H6v-9h7.5v9zM18 1.5H9a.75.75 0 00-.75.75V6h-.75A.75.75 0 006 6.75v6a.75.75 0 00.75.75H18a.75.75 0 00.75-.75V2.25A.75.75 0 0018 1.5zM7.5 7.5h7.5V12h-7.5V7.5z" />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15L15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14.25v4.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V7.5a2.25 2.25 0 012.25-2.25H12" />
  </svg>
);

const CodeBlock = ({ children, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  };

  const handleEdit = () => {
    alert('Feature to be added soon!');
    // You would wire up your editing logic here
  };

  return (
    <div className="relative my-4 w-full rounded-lg overflow-hidden bg-black shadow-md flex flex-col justify-between"> {/* Darker background for the block */}
      <div className="flex justify-between items-center px-4 py-2 bg-slate-600 text-gray-200 text-xs font-semibold">
        <span>{language.toUpperCase()}</span>
        <div className="flex space-x-2">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-gray-600 transition-colors duration-200 text-white"
            title="Copy code"
          >
            {copied ? <CheckIcon /> : <CopyIcon />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center space-x-1 px-3 py-1 rounded-md hover:bg-gray-600 transition-colors duration-200 text-white"
            title="Edit code"
          >
            <EditIcon />
            <span>Edit</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto p-4 text-sm"> {/* Added padding here */}
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={language}
          PreTag="div"
          className="!bg-transparent scrollbar-thumb-visible" // Override Prism's default bg and padding
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;