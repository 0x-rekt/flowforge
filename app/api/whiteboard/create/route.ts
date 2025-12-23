import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { title } = await req.json();

  if (!title || typeof title !== "string") {
    return NextResponse.json({ error: "Invalid title" }, { status: 400 });
  }

  const whiteboard = await prisma.whiteBoard.create({
    data: {
      title,
      ownerId: user.id,
    },
  });

  await prisma.whiteBoardMember.create({
    data: {
      userId: whiteboard.ownerId,
      whiteBoardId: whiteboard.id,
      role: "owner",
    },
  });

  return NextResponse.json({ whiteboard }, { status: 201 });
};
