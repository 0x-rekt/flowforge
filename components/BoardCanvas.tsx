"use client";

import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import { useRef } from "react";
import { OrderedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import toast from "react-hot-toast";
import axios from "axios";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
  { ssr: false }
);

export default function BoardCanvas({
  whiteBoardId,
  whiteBoardInitialData,
}: {
  whiteBoardId: string;
  whiteBoardInitialData?: readonly OrderedExcalidrawElement[];
}) {
  const boardStateRef = useRef<readonly OrderedExcalidrawElement[]>([]);

  const handleSave = async () => {
    try {
      await axios.post("/api/whiteboard/save", {
        elements: boardStateRef.current,
        whiteBoardId,
      });
      toast.success("Whiteboard saved!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save whiteboard.");
    }
  };

  return (
    <div className="h-screen w-full">
      <Excalidraw
        theme="dark"
        onChange={(elements) => {
          boardStateRef.current = elements;
        }}
        initialData={{
          elements: whiteBoardInitialData ?? [],
        }}
        renderTopRightUI={() => (
          <button
            onClick={handleSave}
            className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md m-2"
          >
            Save
          </button>
        )}
      />
    </div>
  );
}
