"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { OrderedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
import toast from "react-hot-toast";
import axios from "axios";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { LiveCollaborationTrigger } from "@excalidraw/excalidraw";

const Excalidraw = dynamic(
  async () => {
    await import("@excalidraw/excalidraw/index.css");
    return (await import("@excalidraw/excalidraw")).Excalidraw;
  },
  { ssr: false }
);

interface BoardMember {
  id: string;
  name: string;
  image: string | null;
}

export default function BoardCanvas({
  whiteBoardId,
  whiteBoardInitialData,
  members,
}: {
  whiteBoardId: string;
  whiteBoardInitialData?: readonly OrderedExcalidrawElement[];
  members: BoardMember[];
}) {
  const [excalidrawAPI, setExcalidrawAPI] = useState<any>(null);
  const [isCollaborating, setIsCollaborating] = useState(false);

  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);

  /** 🔹 Sync collaborators exactly like Excalidraw example */
  useEffect(() => {
    if (!excalidrawAPI) return;

    if (isCollaborating) {
      const collaborators = new Map();

      members.forEach((member) => {
        collaborators.set(member.id, {
          username: member.name,
          avatarUrl: member.image ?? undefined,
        });
      });

      excalidrawAPI.updateScene({ collaborators });
    } else {
      excalidrawAPI.updateScene({
        collaborators: new Map(),
      });
    }
  }, [isCollaborating, members, excalidrawAPI]);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post("/api/whiteboard/save", {
        whiteBoardId,
      });
      toast.success("Whiteboard saved!");
    } catch {
      toast.error("Failed to save whiteboard.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (email: string) => {
    await axios.post("/api/whiteboard/add-member", {
      boardId: whiteBoardId,
      email,
    });
  };

  return (
    <div className="h-screen w-full">
      <Excalidraw
        theme="dark"
        excalidrawAPI={(api) => setExcalidrawAPI(api)}
        initialData={{
          elements: whiteBoardInitialData ?? [],
        }}
        renderTopRightUI={() => (
          <div className="flex items-center gap-6">
            {/* Avatars */}
            <div className="flex -space-x-2">
              {members.map((member) => (
                <Avatar key={member.id}>
                  <AvatarImage src={member.image ?? undefined} />
                  <AvatarFallback>
                    {member.name?.[0]?.toUpperCase() ?? "U"}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>

            {/* Save */}
            <Button onClick={handleSave} disabled={loading}>
              {loading ? <Loader className="animate-spin" /> : "Save"}
            </Button>

            {/* Live collaboration toggle */}
            <LiveCollaborationTrigger
              isCollaborating={isCollaborating}
              onSelect={() => setIsCollaborating(true)}
            />

            {/* Add member */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="bg-[#0c0c0c] text-white">
                <DialogHeader>
                  <DialogTitle>Add member</DialogTitle>
                  <DialogDescription>
                    Invite someone to collaborate.
                  </DialogDescription>
                </DialogHeader>

                <Label>Email</Label>
                <Input
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />

                <DialogFooter>
                  <Button
                    disabled={inviteLoading}
                    onClick={async () => {
                      setInviteLoading(true);
                      await handleAddMember(inviteEmail);
                      toast.success("Member added");
                      setInviteEmail("");
                      setIsDialogOpen(false);
                      setInviteLoading(false);
                    }}
                  >
                    Add
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button onClick={() => setIsDialogOpen(true)}>Add Member</Button>
          </div>
        )}
      />
    </div>
  );
}
