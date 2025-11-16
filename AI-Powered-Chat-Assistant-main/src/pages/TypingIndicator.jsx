export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-gray-200 text-black px-3 py-2 rounded-2xl max-w-[80%]">
        <div className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-150" />
          <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300" />
        </div>
      </div>
    </div>
  );
}
