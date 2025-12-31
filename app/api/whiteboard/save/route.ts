import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { elements, whiteBoardId } = await req.json();

    if (!whiteBoardId || typeof whiteBoardId !== "string") {
      return NextResponse.json(
        { error: "Invalid whiteBoardId" },
        { status: 400 }
      );
    }

    const member = await prisma.whiteBoardMember.findFirst({
      where: {
        whiteBoardId,
        userId: session.user.id,
      },
    });

    if (!member) {
      return NextResponse.json(
        { error: "You don't have access to this whiteboard" },
        { status: 403 }
      );
    }

    const whiteBoard = await prisma.whiteBoard.findUnique({
      where: {
        id: whiteBoardId,
      },
    });

    if (!whiteBoard) {
      return NextResponse.json(
        { error: "Whiteboard not found" },
        { status: 404 }
      );
    }

    await prisma.whiteBoard.update({
      where: {
        id: whiteBoardId,
      },
      data: {
        contents: elements || [],
      },
    });

    return NextResponse.json(
      { message: "Whiteboard saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving whiteboard:", error);
    return NextResponse.json(
      { error: "Failed to save whiteboard" },
      { status: 500 }
    );
  }
}
