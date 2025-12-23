import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { AuthFadeIn } from "@/components/auth-fade-in";
import { CreateBoardDialog } from "@/components/CreateBoardDialog";
import { FileText, Layout, Clock } from "lucide-react";
import Link from "next/link";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const data = await prisma.whiteBoard.findMany({
    where: {
      members: { some: { userId: session?.user.id } },
    },
    orderBy: { createdAt: "desc" },
  });

  console.log(data);

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
                <Link
                  href={`/board/${wb.id}`}
                  key={wb.id}
                  className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-10">
                    <div className="h-12 w-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FileText className="h-6 w-6 text-zinc-400" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-white font-semibold text-xl truncate">
                      {wb.title}
                    </h3>
                    <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-widest">
                      <Clock className="h-3.5 w-3.5" />
                      <span>{wb.createdAt.toDateString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </AuthFadeIn>
      </div>
    </div>
  );
};

export default DashboardPage;
