import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function ChatMessages({ messages }) {
  return (
    <div className="space-y-4">
      {messages.map((m, i) => (
        <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
          <div
            className={`max-w-[80%]  px-2 py-1 md:px-4 md:py-4 rounded-xl shadow-sm ${m.role === "user"
                ? "bg-indigo-600 text-white"
                : "bg-white border text-black"
              }`}
          >
            {m.role === "assistant" ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    return inline ? (
                      <code className="bg-gray-200 px-1 rounded" {...props}>
                        {children}
                      </code>
                    ) : (
                      <pre className="bg-black text-white p-2 rounded-lg overflow-auto my-2">
                        <code>{children}</code>
                      </pre>
                    );
                  },
                  ul: (props) => <ul className="list-disc ml-5" {...props} />,
                  ol: (props) => <ol className="list-decimal ml-5" {...props} />,
                  strong: (props) => <strong className="font-bold" {...props} />,
                  em: (props) => <em className="italic" {...props} />,
                }}
              >
                {m.content}
              </ReactMarkdown>
            ) : (
              m.content
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
