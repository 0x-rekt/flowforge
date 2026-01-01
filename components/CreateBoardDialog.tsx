"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import CustomBtn from "@/components/custom-btn";
import { Plus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

export function CreateBoardDialog() {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (!title.trim()) return toast.error("Please enter a title");

    setLoading(true);
    try {
      const res = await axios.post("/api/whiteboard/create", {
        title: title.trim(),
      });
      if (res.status !== 201) throw new Error("Failed to create board");
      toast.success("Board created successfully");
      setOpen(false);
      setTitle("");
      router.refresh();
    } catch (error) {
      toast.error("Could not create board. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="w-full md:w-auto">
          <CustomBtn
            text="New Whiteboard"
            className="bg-white text-black hover:bg-zinc-200 border-none px-6 py-3"
          >
            <Plus className="h-5 w-5" />
          </CustomBtn>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-[#0c0c0c] border-white/10 text-white sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create Whiteboard
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Enter a title for your new workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="py-6">
          <input
            autoFocus
            placeholder="e.g. System Architecture"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 transition-all"
          />
        </div>
        <div className="flex justify-end">
          <CustomBtn
            text={loading ? "Creating..." : "Confirm & Create"}
            onClick={handleCreate}
            className="w-full py-4 bg-zinc-100 text-black hover:bg-white"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          </CustomBtn>
        </div>
      </DialogContent>
    </Dialog>
  );
}
