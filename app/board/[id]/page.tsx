import BoardCanvas from "@/components/BoardCanvas";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar"; // Re-importing Navbar

const BoardPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const isUserMember = await prisma.whiteBoardMember.findFirst({
    where: { whiteBoardId: id, userId: session.user.id },
    include: {
      whiteBoard: {
        include: {
          members: {
            include: {
              user: { select: { id: true, name: true, image: true } },
            },
          },
        },
      },
    },
  });

  if (!isUserMember) redirect("/dashboard");

  const raw = isUserMember.whiteBoard.contents;
  const initialData = Array.isArray(raw) ? raw : [];
  const members = isUserMember.whiteBoard.members.map((member) => member.user);

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0a] overflow-hidden">
      <main className="flex-1 relative">
        <BoardCanvas
          whiteBoardId={id}
          whiteBoardInitialData={initialData}
          members={members}
          user={{
            id: session.user.id,
            name: session.user.name || "Unnamed User",
            email: session.user.email || "",
            image: session.user.image || null,
          }}
        />
      </main>
    </div>
  );
};

export default BoardPage;
