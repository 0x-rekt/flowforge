import BoardCanvas from "@/components/BoardCanvas";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { OrderedExcalidrawElement } from "@excalidraw/excalidraw/element/types";
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

  const initialData: readonly OrderedExcalidrawElement[] = Array.isArray(raw)
    ? (raw as unknown as OrderedExcalidrawElement[])
    : [];

  const members = isUserMember.whiteBoard.members.map((member) => member.user);

  return (
    <div className="min-h-screen">
      <BoardCanvas
        whiteBoardId={id}
        whiteBoardInitialData={initialData}
        members={members}
      />
    </div>
  );
};

export default BoardPage;
