import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const createBoard = mutation({
  args: {
    name: v.string(),
    orgId: v.id("organizations"),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    const auth = await ctx.auth.getUserIdentity();
    if (!auth) return;
    return await ctx.db.insert("boards", {
      authorId: auth.subject,
      name: args.name,
      isDeleted: false,
      isPrivate: false,
      isStarred: false,
      orgId: args.orgId,
    });
  },
});

export const deleteBoard = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, {
      isDeleted: true,
    });
  },
});

export const starBoard = mutation({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    const board = await ctx.db
      .query("boards")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .unique();

    await ctx.db.patch(args.id, {
      isStarred: !board?.isStarred,
    });

    return !board?.isStarred;
  },
});
