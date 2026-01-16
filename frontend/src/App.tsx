import React, { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError("");
      setImage("");
      setEnhancedPrompt("");

      const res = await axios.post("http://localhost:5000/api/image/generate", { prompt });
      setEnhancedPrompt(res.data.enhancedPrompt);
      setImage(res.data.imageUrl);
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        🖼️ AdVantage Gen — Image Generator
      </h1>

      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Describe your ad concept..."
        className="border border-gray-300 rounded-lg p-3 w-96 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleGenerate}
        disabled={!prompt || loading}
        className={`px-5 py-2 rounded-lg text-white font-medium ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Generating..." : "Generate Ad Image"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {enhancedPrompt && (
        <div className="bg-white p-4 rounded-md shadow mt-6 max-w-xl text-gray-700 text-sm">
          <strong>Enhanced Prompt:</strong> {enhancedPrompt}
        </div>
      )}

      {image && (
        <img
          src={image}
          alt="Generated"
          className="mt-6 w-96 rounded-lg shadow-lg border border-gray-200"
        />
      )}
    </div>
  );
};

export default App;
