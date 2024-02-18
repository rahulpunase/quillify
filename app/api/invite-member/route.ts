import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { orgId, randomId } = await request.json();

  const info = await convex.mutation(api.members.mutation.updateInviteMember, {
    userId: user.id,
    orgId,
    randomId,
  });

  return Response.json({
    info,
  });
}
