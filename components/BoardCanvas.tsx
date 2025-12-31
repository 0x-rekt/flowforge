"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Loader, Save, UserPlus } from "lucide-react";
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
import { Tldraw, useEditor } from "tldraw";
import { useSyncDemo } from "@tldraw/sync";
import "tldraw/tldraw.css";
import { useRouter } from "next/navigation";

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
      color: "#" + (((1 << 24) * Math.random()) | 0).toString(16), // Random color
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
    <div className="h-screen w-full relative">
      <Tldraw store={store}>
        <TldrawUI
          whiteBoardId={whiteBoardId}
          members={members}
          loading={loading}
          setLoading={setLoading}
          isAddMemberOpen={isAddMemberOpen}
          setIsAddMemberOpen={setIsAddMemberOpen}
          initialData={whiteBoardInitialData}
        />
      </Tldraw>

      <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Member</DialogTitle>
            <DialogDescription>
              Invite someone to collaborate on this whiteboard by entering their
              email address.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="member@example.com"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddMember();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddMemberOpen(false);
                setMemberEmail("");
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddMember} disabled={addingMember}>
              {addingMember ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </>
              ) : (
                "Add Member"
              )}
            </Button>
          </DialogFooter>
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
  isAddMemberOpen,
  setIsAddMemberOpen,
  initialData,
}: {
  whiteBoardId: string;
  members: BoardMember[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  isAddMemberOpen: boolean;
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
      const shapes = editor.getCurrentPageShapes();
      console.log(shapes);

      const elements = shapes.map((shape) => shape);
      console.log(elements);

      await axios.post("/api/whiteboard/save", {
        whiteBoardId,
        elements,
      });
      toast.success("Whiteboard saved!");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save whiteboard.");
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
    <>
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
        <div className="flex items-center gap-2 border-r pr-4">
          <div className="flex -space-x-2">
            {members.map((member) => (
              <div key={member.id} className="relative group">
                <Avatar className="border-2 border-white dark:border-gray-800 w-8 h-8">
                  <AvatarImage
                    src={member.image || undefined}
                    alt={member.name}
                  />
                  <AvatarFallback className="text-xs">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {member.name}
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAddMemberOpen(true)}
            className="h-8 w-8 p-0 rounded-full"
          >
            <UserPlus className="h-4 w-4" />
          </Button>
        </div>

        <Button
          onClick={handleSave}
          disabled={loading}
          size="sm"
          className="gap-2"
        >
          {loading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          Save
        </Button>
      </div>
    </>
  );
}
