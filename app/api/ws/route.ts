import { WebSocketServer } from "ws";
import { NextRequest } from "next/server";
import * as y from "yjs";
import { WebsocketProvider } from "y-websocket";

const docs: Map<string, y.Doc> = new Map();

let wss: WebSocketServer | null = null;

export async function GET(req: NextRequest) {
  if (!wss) {
    const server = new WebSocketServer({ noServer: true });
    server.on("connection", (ws, request) => {
      const url = new URL(request.url || "", "http://localhost");
      const whiteBoardId = url.searchParams.get("whiteBoardId");

      if (!whiteBoardId) {
        ws.close();
        return;
      }

      let doc = docs.get(whiteBoardId);
      if (!doc) {
        doc = new y.Doc();
        docs.set(whiteBoardId, doc);
      }

      const provider = new WebsocketProvider(
        "ws://localhost:3000/api/ws",
        whiteBoardId,
        doc,
        { WebSocketPolyfill: ws as any }
      );

      ws.on("close", () => {
        provider.destroy();

        if (doc!.getMap("connections").size === 0) {
          docs.delete(whiteBoardId!);
        }
      });
    });

    wss = server;
  }

  return new Response(null, {
    status: 101,
    webSocket: wss as any,
  } as any);
}
