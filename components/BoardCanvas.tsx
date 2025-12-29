"use client";

import dynamic from "next/dynamic";
import "@excalidraw/excalidraw/index.css";
import { useRef, useState } from "react";
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
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const Excalidraw = dynamic(
  async () => (await import("@excalidraw/excalidraw")).Excalidraw,
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
  const boardStateRef = useRef<readonly OrderedExcalidrawElement[]>([]);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteLoading, setInviteLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post("/api/whiteboard/save", {
        elements: boardStateRef.current,
        whiteBoardId,
      });
      toast.success("Whiteboard saved!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save whiteboard.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (email: string) => {
    try {
      const response = await axios.post("/api/whiteboard/add-member", {
        boardId: whiteBoardId,
        email,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to add member.");
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
          <div className="flex items-center gap-8">
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2">
              {members.map((member) => (
                <Avatar key={member.id}>
                  <AvatarImage
                    src={member.image ?? undefined}
                    alt={member.name ?? "User avatar"}
                  />
                  <AvatarFallback>
                    {member.name?.charAt(0).toUpperCase() || "U"}{" "}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            <Button
              onClick={handleSave}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md"
              disabled={loading}
            >
              {loading ? <Loader className="animate-spin" /> : "Save"}
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="sm:max-w-md bg-[#0c0c0c] border-white/10 text-white">
                <DialogHeader>
                  <DialogTitle>Add member</DialogTitle>
                  <DialogDescription>
                    Add a user to collaborate on this whiteboard.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                      id="email"
                      placeholder="user@example.com"
                      value={inviteEmail}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setInviteEmail(e.target.value)
                      }
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    variant="secondary"
                    onClick={() => setIsDialogOpen(false)}
                    className="cursor-pointer"
                  >
                    Cancel
                  </Button>

                  <Button
                    disabled={!inviteEmail || inviteLoading}
                    className="cursor-pointer bg-white/10 hover:bg-white/20 text-white"
                    onClick={() => {
                      setInviteLoading(true);
                      handleAddMember(inviteEmail)
                        .then(() => {
                          toast.success("Memeber added successfully.");
                          setIsDialogOpen(false);
                          setInviteEmail("");
                        })
                        .catch(() => {
                          toast.error("Failed to send invite.");
                        })
                        .finally(() => {
                          setInviteLoading(false);
                        });
                    }}
                  >
                    {inviteLoading ? (
                      <Loader className="h-4 w-4 animate-spin cursor-progress" />
                    ) : (
                      "Add Member"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-md"
              onClick={() => setIsDialogOpen(true)}
            >
              Add Member
            </Button>
          </div>
        )}
      />
    </div>
  );
}
