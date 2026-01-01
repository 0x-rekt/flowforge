"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Loader, Save, UserPlus } from "lucide-react";
import CustomBtn from "./custom-btn";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Tldraw, useEditor } from "tldraw";
import { useSyncDemo } from "@tldraw/sync";
import "tldraw/tldraw.css";
import { useRouter } from "next/navigation";
import { AIChatPanel } from "./AIChatPanel";

interface BoardMember {
  id: string;
  name: string;
  image: string | null;
}

export default function BoardCanvas({
  whiteBoardId,
  whiteBoardInitialData,
  members,
  user,
}: {
  whiteBoardId: string;
  whiteBoardInitialData?: any[];
  members: BoardMember[];
  user: { id: string; name: string; email: string; image: string | null };
}) {
  const [loading, setLoading] = useState(false);
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [addingMember, setAddingMember] = useState(false);
  const router = useRouter();

  const store = useSyncDemo({
    roomId: whiteBoardId,
    userInfo: {
      id: user.id,
      name: user.name,
      color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
    },
  });

  const handleAddMember = async () => {
    if (!memberEmail.trim()) {
      toast.error("Please enter an email address");
      return;
    }

    setAddingMember(true);
    try {
      await axios.post("/api/whiteboard/add-member", {
        boardId: whiteBoardId,
        email: memberEmail,
      });
      toast.success("Member added successfully!");
      setMemberEmail("");
      setIsAddMemberOpen(false);
      router.refresh();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to add member");
    } finally {
      setAddingMember(false);
    }
  };

  return (
    <div className="h-full w-full relative group">
      <Tldraw store={store}>
        <TldrawUI
          whiteBoardId={whiteBoardId}
          members={members}
          loading={loading}
          setLoading={setLoading}
          setIsAddMemberOpen={setIsAddMemberOpen}
          initialData={whiteBoardInitialData}
        />
        <AIChatPanel />
      </Tldraw>

      {/* Themed Add Member Dialog */}
      <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
        <DialogContent className="bg-[#0a0a0a] border border-white/10 text-white shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              Add Collaborator
            </DialogTitle>
            <DialogDescription className="text-zinc-500">
              Invite others to design and build in real-time.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <input
              type="email"
              placeholder="colleague@example.com"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddMember()}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-500/50 transition-all"
            />
          </div>
          <div className="flex flex-col gap-3">
            <CustomBtn
              text={addingMember ? "Sending Invitation..." : "Invite Member"}
              onClick={handleAddMember}
              className="bg-white text-black hover:bg-zinc-200 border-none font-bold py-3"
            >
              {addingMember && <Loader className="h-4 w-4 animate-spin" />}
            </CustomBtn>
            <CustomBtn
              text="Cancel"
              onClick={() => setIsAddMemberOpen(false)}
              className="bg-transparent border-white/10 hover:bg-white/5 py-3"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function TldrawUI({
  whiteBoardId,
  members,
  loading,
  setLoading,
  setIsAddMemberOpen,
  initialData,
}: {
  whiteBoardId: string;
  members: BoardMember[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setIsAddMemberOpen: (open: boolean) => void;
  initialData?: any[];
}) {
  const editor = useEditor();

  useEffect(() => {
    editor.user.updateUserPreferences({ colorScheme: "dark" });

    if (initialData && initialData.length > 0) {
      try {
        editor.createShapes(initialData);
      } catch (error) {
        console.error("Error loading initial data:", error);
      }
    }
  }, [editor, initialData]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const shapes = Array.from(editor.getCurrentPageShapes().values());

      await axios.post("/api/whiteboard/save", {
        whiteBoardId,
        elements: shapes,
      });
      toast.success("Board saved successfully");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save board");
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-100 flex items-center gap-4 bg-zinc-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 px-4 shadow-2xl">
      <div className="flex items-center gap-3 border-r border-white/10 pr-4">
        <div className="flex -space-x-3">
          {members.map((member) => (
            <div key={member.id} className="relative group/avatar">
              <Avatar className="border-2 border-zinc-900 w-9 h-9 transition-transform group-hover/avatar:scale-110">
                <AvatarImage
                  src={member.image || undefined}
                  alt={member.name}
                />
                <AvatarFallback className="bg-zinc-800 text-white text-[10px] font-bold">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 px-2 py-1 bg-zinc-950 text-white text-[10px] rounded border border-white/10 opacity-0 group-hover/avatar:opacity-100 transition-opacity whitespace-nowrap pointer-events-none uppercase tracking-tighter z-110">
                {member.name}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setIsAddMemberOpen(true)}
          className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all active:scale-90"
          title="Add Member"
        >
          <UserPlus className="h-4 w-4 text-zinc-300" />
        </button>
      </div>

      <CustomBtn
        text={loading ? "Saving..." : "Save Board"}
        onClick={handleSave}
        className="px-5 py-2 border-none bg-white text-black font-bold h-9 text-xs w-auto"
      >
        {loading ? (
          <Loader className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
      </CustomBtn>
    </div>
  );
}
