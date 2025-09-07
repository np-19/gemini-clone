import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { assets } from "../../assets/assets";
import CodeBlock from "./CodeBlock"; // Assuming CodeBlock is a component you want to use for code syntax highlighting

const Markdown = ({ item, loading }) => {
  // Define your custom components for ReactMarkdown once
  const customMarkdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <CodeBlock language={match[1]}>
          {String(children).replace(/\n$/, "")}
        </CodeBlock>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    // Your existing custom styling for other Markdown elements
    h1: ({ node, ...props }) => (
      <h1
        className="text-3xl font-bold mt-6 mb-2 text-gray-900"
        {...props}
      />
    ),
    h2: ({ node, ...props }) => (
      <h2
        className="text-2xl font-semibold mt-5 mb-2 text-gray-800"
        {...props}
      />
    ),
    h3: ({ node, ...props }) => (
      <h3
        className="text-xl font-medium mt-4 mb-1 text-gray-700"
        {...props}
      />
    ),
    p: ({ node, ...props }) => (
      <p className="text-gray-700 my-2" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul
        className="list-disc list-outside ml-6 my-2 text-gray-700 space-y-1"
        {...props}
      />
    ),
    ol: ({ node, ...props }) => (
      <ol
        className="list-decimal list-outside ml-6 my-2 text-gray-700 space-y-1"
        {...props}
      />
    ),
    li: ({ node, ...props }) => <li className="my-1" {...props} />,
    blockquote: ({ node, ...props }) => (
      <blockquote
        className="border-l-4 border-gray-300 pl-4 py-2 my-4 text-gray-600 italic"
        {...props}
      />
    ),
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto scrollbar-thumb-visible rounded-xl">
        <table
          className="min-w-full divide-y divide-gray-200"
          {...props}
        />
      </div>
    ),
    thead: ({ node, ...props }) => (
      <thead className="bg-gray-100" {...props} />
    ),
    th: ({ node, ...props }) => (
      <th
        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        {...props}
      />
    ),
    tr: ({ node, ...props }) => (
      <tr className="even:bg-gray-100" {...props} />
    ),
    td: ({ node, ...props }) => (
      <td
        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
        {...props}
      />
    ),
    hr: () => <hr className="my-8 border-t-2 border-gray-300" />,
    // You can also override the default `img` component if you want to
    // add custom styling to markdown-embedded images, though for inlineData
    // we're rendering it separately.
    // img: ({ node, ...props }) => <img className="my-4 max-w-full h-auto rounded-lg" {...props} />,
  };

  return (
    <div className="max-w-[758px] w-full space-y-4 p-4">
      {/* User prompt */}
      <div className="w-full h-auto relative flex justify-end mb-4 pl-4">
        {item.prompt && (
          <p className="px-5 py-2 max-w-[80%] bg-green-700 text-white rounded-[20px_0px_20px_20px]">
            {item.prompt}
          </p>
        )}
        {/* Render user-uploaded image if available */}
        {item.promptImage && (
          <img
            src={item.promptImage}
            alt="User uploaded"
            className="w-auto h-32 object-contain ml-4 rounded-xl"
          />
        )}
      </div>

      {/* Gemini response */}
      <div className="w-full relative pl-4 mb-4">
        <div className="absolute -left-8 -top-2 flex justify-center ">
          {loading ? (
            <div
              className={`conic-border top-1/2 flex-shrink-0 mr-4 size-10 flex items-center justify-center`}
            >
              <div className="conic-border-inner flex items-center justify-center">
                <img
                  src={assets.gemini_icon}
                  alt="Gemini is typing"
                  className="size-7 z-50 animate-pulse"
                />
              </div>
            </div>
          ) : (
            <div className="flex-shrink-0 mr-4 size-10 flex items-center justify-center">
              <img
                src={assets.gemini_icon}
                alt="Gemini"
                className="size-7"
              />
            </div>
          )}
        </div>

        {loading ? null : (
          <div className="w-full">
            {/* Iterate through each part of the Gemini response */}
            {item.responseParts && item.responseParts.map((part, index) => {
              // If it's a text part, render it using ReactMarkdown with your custom components
              if (part.text) {
                return (
                  <ReactMarkdown
                    key={`text-part-${index}`} // Unique key for text part
                    remarkPlugins={[remarkGfm]}
                    components={customMarkdownComponents} // Apply your custom components here
                  >
                    {part.text}
                  </ReactMarkdown>
                );
              }
              // If it's an inlineData (image) part, render an img tag
              else if (part.inlineData) {
                const src = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                return (
                  <img
                    key={`image-part-${index}`} // Unique key for image part
                    src={src}
                    alt="Generated content"
                    className="my-4 max-w-full h-auto rounded-lg" // Added some basic styling here
                  />
                );
              }
              return null; // Don't render anything for unsupported part types
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Markdown;