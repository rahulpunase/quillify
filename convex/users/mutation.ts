import { v } from "convex/values";
import { mutation } from "../_generated/server";

export const create = mutation({
  args: {
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    userId: v.string(),
    pictureUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const _user = {
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      pictureUrl: args.pictureUrl,
      userId: args.userId,
    };
    const alreadyAvailable = await ctx.db
      .query("users")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();
    if (alreadyAvailable) {
      return _user;
    }
    await ctx.db.insert("users", _user);
    return _user;
  },
});
