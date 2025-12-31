"use client";

import { useState } from "react";
import { useEditor } from "tldraw";
import CustomBtn from "./custom-btn";
import { Sparkles, Code, Loader2, Copy, Check } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";

export function AIChatPanel() {
  const editor = useEditor();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);

  const handleAIAction = async (mode: "text-to-design" | "design-to-code") => {
    if (!input.trim() && mode === "text-to-design") {
      return toast.error("Please describe what you want to design");
    }

    setLoading(true);
    setGeneratedCode("");

    try {
      const res = await axios.post("/api/ai", {
        prompt: input,
        mode,
      });

      if (res.data.error) {
        throw new Error(res.data.error);
      }

      if (mode === "text-to-design") {
        const shapes = res.data.shapes;

        if (!Array.isArray(shapes)) {
          throw new Error("Invalid shapes returned from AI");
        }

        editor.createShapes(shapes);
        editor.zoomToSelection();

        toast.success(`Generated ${shapes.length} shapes`);
        setInput("");
        return;
      }

      const cleanedCode = res.data.code
        ?.replace(
          /```(?:tsx|typescript|jsx|javascript)?\s*([\s\S]*?)```/g,
          "$1"
        )
        ?.trim();

      setGeneratedCode(cleanedCode || "");
      toast.success("Code generated!");
    } catch (e: any) {
      console.error("AI Error:", e);
      toast.error(e.message || "AI failed");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="absolute right-6 top-24 w-80 z-[100] bg-zinc-900/90 border border-white/10 rounded-2xl p-4">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white"
        placeholder="Describe your design..."
      />

      <div className="flex gap-2 mt-3">
        <CustomBtn
          onClick={() => handleAIAction("text-to-design")}
          className="bg-purple-600 border-none flex-1"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
        </CustomBtn>

        <CustomBtn
          onClick={() => handleAIAction("design-to-code")}
          className="bg-zinc-100 text-black border-none flex-1"
        >
          {loading ? <Loader2 className="animate-spin" /> : <Code />}
        </CustomBtn>
      </div>

      {generatedCode && (
        <div className="mt-4 bg-black/40 p-3 rounded-xl relative">
          <button onClick={handleCopy} className="absolute top-2 right-2">
            {copied ? <Check /> : <Copy />}
          </button>
          <pre className="text-[10px] text-zinc-300 whitespace-pre-wrap">
            {generatedCode}
          </pre>
        </div>
      )}
    </div>
  );
}
