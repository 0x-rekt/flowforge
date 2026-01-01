"use client";

import { useState } from "react";
import { useEditor } from "tldraw";
import CustomBtn from "./custom-btn";
import {
  Sparkles,
  Code,
  Loader2,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export function AIChatPanel() {
  const editor = useEditor();
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const ALLOWED_COLORS = new Set([
    "black",
    "grey",
    "white",
    "blue",
    "light-blue",
    "violet",
    "light-violet",
    "green",
    "light-green",
    "yellow",
    "orange",
    "red",
    "light-red",
  ]);

  function normalizeColor(color?: string) {
    return ALLOWED_COLORS.has(color ?? "") ? color : "black";
  }

  function safeRichText(richText?: any) {
    const text = richText?.content?.[0]?.content?.[0]?.text?.trim() || " ";

    return {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [{ type: "text", text }],
        },
      ],
    };
  }

  const applyOperations = (ops: any[]) => {
    editor.run(() => {
      ops.forEach((op) => {
        if (op.action === "delete" && op.id) {
          editor.deleteShapes([op.id]);
          return;
        }

        if (op.action === "add" && op.shape) {
          const shape = structuredClone(op.shape);

          if (shape.type === "text") {
            delete shape.props?.text;
            shape.props.richText = safeRichText(shape.props.richText);
          }

          if (shape.type === "geo") {
            delete shape.props?.richText;
          }

          shape.props.color = normalizeColor(shape.props?.color);

          editor.createShapes([shape]);
          return;
        }

        if (op.action === "update" && op.id && op.patch) {
          const patch = structuredClone(op.patch);

          if (patch.props?.richText) {
            patch.props.richText = safeRichText(patch.props.richText);
          }

          delete patch.props?.text;
          patch.props.color = normalizeColor(patch.props?.color);

          editor.updateShapes([{ id: op.id, ...patch }]);
        }
      });
    });
  };

  const handleAIAction = async (mode: "text-to-design" | "design-to-code") => {
    if (!input.trim() && mode === "text-to-design") {
      return toast.error("Describe what you want to change");
    }

    setLoading(true);
    setGeneratedCode("");

    try {
      const context = Array.from(editor.getCurrentPageShapes().values());

      const res = await axios.post("/api/ai", {
        mode,
        prompt: input,
        context,
      });

      if (res.data.error) {
        throw new Error(res.data.error);
      }

      if (mode === "text-to-design") {
        const { operations } = res.data;

        if (!Array.isArray(operations)) {
          throw new Error("AI did not return operations");
        }

        applyOperations(operations);
        editor.zoomToSelection();

        toast.success("Design updated");
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
      toast.success("Code generated");
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
    <div
      className={cn(
        "fixed z-2000 transition-all duration-300 ease-in-out",
        "bottom-20 left-4 right-4 w-auto md:right-auto md:left-2 md:top-11 md:bottom-auto md:w-72",
        isMinimized ? "h-14" : "h-auto"
      )}
    >
      <div className="bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden max-h-[70vh]">
        <div
          className="p-3 border-b border-white/10 flex items-center justify-between cursor-pointer active:bg-white/5"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold text-white tracking-tight uppercase">
              FlowForge AI
            </span>
          </div>
          <div className="flex items-center gap-2">
            {loading && (
              <Loader2 className="animate-spin w-3 h-3 text-zinc-500" />
            )}
            <button className="text-zinc-500 hover:text-white transition-colors">
              {isMinimized ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronUp size={16} />
              )}
            </button>
          </div>
        </div>

        {!isMinimized && (
          <div className="p-4 space-y-4 overflow-y-auto">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-24 bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-purple-500/50 resize-none transition-all"
              placeholder="Describe your design..."
            />

            <div className="flex gap-2">
              <Button
                disabled={loading}
                onClick={() => handleAIAction("text-to-design")}
                className="bg-purple-600 border-none flex-1 h-10 px-2"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span className="text-[10px] sm:text-xs">Design</span>
              </Button>

              <Button
                disabled={loading}
                onClick={() => handleAIAction("design-to-code")}
                className="bg-zinc-100 text-black border-none flex-1 h-10 px-2 hover:bg-white"
              >
                {loading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <Code className="w-4 h-4" />
                )}
                <span className="text-[10px] sm:text-xs">To Code</span>
              </Button>
            </div>

            {generatedCode && (
              <div className="bg-black/40 rounded-xl border border-white/5 relative group max-h-48 overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-2 border-b border-white/5 bg-white/5">
                  <span className="text-[10px] text-zinc-500 font-mono">
                    OUTPUT
                  </span>
                  <CustomBtn
                    onClick={handleCopy}
                    className="p-1 text-zinc-400 hover:text-white"
                  >
                    {copied ? (
                      <Check size={14} className="text-green-500" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </CustomBtn>
                </div>
                <div className="overflow-auto p-3">
                  <pre className="text-[10px] text-zinc-300 font-mono whitespace-pre-wrap">
                    {generatedCode}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
