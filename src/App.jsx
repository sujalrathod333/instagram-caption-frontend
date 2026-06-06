import { useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import { ThreeDots } from "react-loader-spinner";

function App() {
  const [question, setQuestion] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!question.trim()) return;

    try {
      setLoading(true);
      setData("");

      const response = await axios.post("http://localhost:3000/ask", {
        question,
      });

      setData(response.data.answer);
    } catch (error) {
      console.log(error);
      setData("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const copyCaption = () => {
    navigator.clipboard.writeText(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af] px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">
          Instagram Caption Generator
        </h1>

        <p className="text-white/90 text-sm md:text-base">
          Create captions and hashtags for your Instagram posts
        </p>
      </div>

      {/* Main Layout */}
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-[30%_auto] gap-5">
        {/* Left Panel */}
        <form
          onSubmit={handleSubmit}
          className="
            bg-white/10
            backdrop-blur-md
            border
            border-white/30
            rounded-2xl
            shadow-xl
            p-5
          "
        >
          <h2 className="font-semibold text-xl text-white mb-4">
            Describe Your Post
          </h2>

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: Sunset with family on the beach..."
            className="
              w-full
              h-[220px]
              resize-none
              bg-white/10
              border
              border-white/30
              rounded-xl
              p-4
              outline-none
              text-white
              placeholder:text-white/60
            "
          />

          <div className="text-right text-sm text-white/70 mt-2">
            {question.length}/500
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              mt-4
              py-3
              rounded-xl
              bg-white
              text-[#dd2a7b]
              font-bold
              hover:bg-gray-100
              transition
              disabled:opacity-70
              cursor-pointer
            "
          >
            {loading ? "Generating..." : "Generate Caption"}
          </button>
        </form>
         
         {/* Right Panel */}
<div
  className="
    bg-white/10
    backdrop-blur-md
    border
    border-white/30
    rounded-2xl
    shadow-xl
    overflow-hidden
  "
>
  {/* Header */}
  <div className="flex items-center justify-between px-5 py-4 border-b border-white/20">
    <div>
      <h2 className="text-white font-bold text-xl">
        Generated Content
      </h2>

      <p className="text-white/70 text-sm">
        AI generated caption ready to copy
      </p>
    </div>

    {data && !loading && (
      <button
        onClick={copyCaption}
        className="
          px-4
          py-2
          rounded-full
          bg-white
          text-[#dd2a7b]
          font-semibold
          hover:bg-gray-100
          transition
          cursor-pointer
        "
      >
        Copy Caption
      </button>
    )}
  </div>

  {/* Content Area */}
  <div className="h-[420px] p-5">
    {loading ? (
      <div className="flex justify-center items-center h-full">
        <ThreeDots
          visible={true}
          height="60"
          width="60"
          color="#ffffff"
        />
      </div>
    ) : (
      <div
        className="
          h-full
          overflow-y-auto
          bg-white
          rounded-xl
          p-5
          shadow-inner
        "
      >
        <div className="prose max-w-none text-black">
          <Markdown>{data}</Markdown>
        </div>
      </div>
    )}
  </div>
</div>
        
      </div>
    </div>
  );
}

export default App;