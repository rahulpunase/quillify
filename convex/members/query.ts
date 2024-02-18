import { v } from "convex/values";
import { query } from "../_generated/server";

export const getAllMembersFromOrg = query({
  args: {
    orgId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    if (!args.orgId) return [];
    const members = await ctx.db
      .query("members")
      .filter((q) => q.eq(q.field("orgId"), args.orgId))
      .collect();

    const memberUserIds = members.map((member) => member.userId);
    const promises = [];
    for (const userId of memberUserIds) {
      promises.push(
        ctx.db
          .query("users")
          .withIndex("by_userId", (q) => q.eq("userId", userId))
          .unique()
      );
    }
    const users = await Promise.all(promises).then((users) =>
      users.map((user) => ({
        ...user,
        role:
          members.find((member) => member.userId === user.userId)?.role ?? "",
      }))
    );
    return users;
  },
});

export const getRole = query({
  args: {
    orgId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("404");
    }
    const member = await ctx.db
      .query("members")
      .filter((q) =>
        q.and(
          q.eq(q.field("userId"), user.subject),
          q.eq(q.field("orgId"), args.orgId)
        )
      )
      .unique();

    if (member) {
      return member.role;
    }
    return "";
  },
});
