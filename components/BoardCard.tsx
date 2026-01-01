"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Clock, Trash2, Loader } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";

interface BoardMember {
  user: {
    id: string;
    name: string;
    image: string | null;
  };
}

interface WhiteBoard {
  id: string;
  title: string;
  createdAt: Date;
  ownerId: string;
  members: BoardMember[];
}

interface BoardCardProps {
  board: WhiteBoard;
  isOwner: boolean;
}

export function BoardCard({ board, isOwner }: BoardCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDeleting(true);
    try {
      const response = await axios.delete(`/api/whiteboard/delete/${board.id}`);

      if (response.status !== 200) {
        throw new Error(response.data?.error || "Failed to delete board");
      }

      toast.success("Board deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete board"
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="group relative">
      <Link
        href={`/board/${board.id}`}
        className="block p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
      >
        <div className="flex items-start justify-between mb-10">
          <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <FileText className="h-6 w-6 text-zinc-400" />
          </div>
          {isOwner && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="opacity-0 group-hover:opacity-100 h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center hover:bg-red-500/20 transition-all duration-200 disabled:opacity-50"
              title="Delete Board"
            >
              {isDeleting ? (
                <Loader className="h-4 w-4 text-red-400 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4 text-red-400" />
              )}
            </button>
          )}
        </div>
        <div className="space-y-3">
          <h3 className="text-white font-semibold text-xl truncate">
            {board.title}
          </h3>
          <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-widest">
            <Clock className="h-3.5 w-3.5" />
            <span>{board.createdAt.toDateString()}</span>
          </div>
        </div>
      </Link>
      {board.members.length > 0 && (
        <div className="absolute bottom-4 right-6 flex -space-x-2">
          {board.members.slice(0, 4).map((member) => (
            <Avatar
              key={member.user.id}
              className="border-2 border-zinc-900 w-6 h-6"
            >
              <AvatarImage
                src={member.user.image || undefined}
                alt={member.user.name}
              />
              <AvatarFallback className="bg-zinc-800 text-white text-[8px] font-bold">
                {member.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
          ))}
          {board.members.length > 4 && (
            <div className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-zinc-900 flex items-center justify-center">
              <span className="text-[8px] text-zinc-400 font-bold">
                +{board.members.length - 4}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
