import BoardCanvas from "@/components/BoardCanvas";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const BoardPage = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const isUserMember = await prisma.whiteBoardMember.findFirst({
    where: {
      whiteBoardId: id,
      userId: session.user.id,
    },
    include: {
      whiteBoard: {
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!isUserMember) {
    redirect("/dashboard");
  }

  const raw = isUserMember.whiteBoard.contents;

  // Parse the initial data
  const initialData = Array.isArray(raw) ? raw : [];

  const members = isUserMember.whiteBoard.members.map((member) => member.user);

  return (
    <div className="min-h-screen">
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
    </div>
  );
};

export default BoardPage;
