import { Waves } from "lucide-react";
import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && e.shiftKey) {
      return;
    }


    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="relative flex items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white rounded-3xl border shadow-sm flex items-center gap-3 px-4 py-3"
      >
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything…"
          className="flex-1 resize-none border-none outline-none bg-transparent"
          rows={2}
          onKeyDown={handleKeyDown}
        />

        <button type="submit" className="text-indigo-600">
          <Waves size={22} />
        </button>
      </form>
    </div>
  );
}
