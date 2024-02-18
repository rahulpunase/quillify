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

  const createdUser = await convex.mutation(api.users.mutation.create, {
    email: user.emailAddresses[0].emailAddress,
    firstName: user.firstName,
    lastName: user.lastName,
    pictureUrl: user.imageUrl,
    userId: user.id,
  });

  return Response.json(createdUser);
}
