import { Liveblocks } from "@liveblocks/node";
import { auth, currentUser } from "@clerk/nextjs";
import { ConvexHttpClient } from "convex/browser";

import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_5gTdFoi_2PAKI9Z_soSkKwipeQO4NXEuASybCvnYVAt41U4pKD51xJ8MQWnjrLqy",
});

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { room } = await request.json();

  const orgId = new URL(request.url).searchParams.get("orgId");

  const board = await convex.query(api.boards.query.get, {
    id: room,
  });

  if (!board) {
    return new Response("Unauthorized - board not found", { status: 403 });
  }

  if (board?.orgId !== orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName!,
    picture: user.imageUrl!,
  };

  const session = liveblocks.prepareSession(user.id, {
    userInfo,
  });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { body, status, error } = await session.authorize();

  return new Response(body, { status });
}
