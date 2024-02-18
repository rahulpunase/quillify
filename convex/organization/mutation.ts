import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createOrganization = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity();
    if (!auth) return;

    const orgId = await ctx.db.insert("organizations", {
      authorId: auth.subject,
      description: args.description,
      name: args.name,
      type: args.type,
    });
    await ctx.db.insert("members", {
      joinedThrough: "create",
      userId: auth.subject,
      orgId: orgId,
      role: "ADMIN",
    });
    return orgId;
  },
});

export const updateInviteUrl = mutation({
  args: {
    id: v.id("organizations"),
    inviteId: v.string(),
  },
  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity();
    if (!auth) return;

    return await ctx.db.patch(args.id, {
      inviteId: args.inviteId,
    });
  },
});
