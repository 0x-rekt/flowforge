import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { AuthFadeIn } from "@/components/auth-fade-in";
import { CreateBoardDialog } from "@/components/CreateBoardDialog";
import { FileText, Layout, Clock, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BoardCard } from "@/components/BoardCard";
import Link from "next/link";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const data = await prisma.whiteBoard.findMany({
    where: {
      members: { some: { userId: session?.user.id } },
    },
    include: {
      members: {
        include: {
          user: {
            select: { id: true, name: true, image: true },
          },
        },
      },
      owner: {
        select: { id: true, name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <AuthFadeIn>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">
                Your Boards
              </h1>
              <p className="text-zinc-500 mt-2">
                Create, manage, and collaborate on your technical diagrams.
              </p>
            </div>
            <CreateBoardDialog />
          </div>

          {data.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 border border-dashed border-white/5 rounded-3xl bg-white/2 backdrop-blur-sm text-center space-y-4">
              <Layout className="h-12 w-12 text-zinc-700 mb-4" />
              <h2 className="text-white font-medium text-xl">
                No boards found
              </h2>
              <p className="text-zinc-500 mt-1">
                Start by creating your first digital whiteboard.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.map((wb) => (
                <BoardCard
                  key={wb.id}
                  board={wb}
                  isOwner={wb.ownerId === session?.user.id}
                />
              ))}
            </div>
          )}
        </AuthFadeIn>
      </div>
    </div>
  );
};

export default DashboardPage;
