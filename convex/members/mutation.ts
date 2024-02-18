import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const updateInviteMember = mutation({
  args: {
    userId: v.string(),
    randomId: v.string(),
    orgId: v.id("organizations"),
  },
  handler: async (ctx, args) => {
    const members = await ctx.db
      .query("members")
      .filter((q) => q.eq(q.field("orgId"), args.orgId))
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .collect();
    const isAlreadyAMember = !!members.length;

    if (isAlreadyAMember) {
      return {
        message: "Already a member of organization.",
      };
    }
    // add member
    const organization = await ctx.db.get(args.orgId);

    if (organization?.inviteId !== args.randomId) {
      return {
        message:
          "The invitation url is not correct or expired. Please ask the admin to send the new url",
      };
    }

    await ctx.db.insert("members", {
      joinedThrough: "link",
      userId: args.userId,
      orgId: args.orgId,
      role: "MEMBER",
      joinedId: "",
    });

    return {
      message: "Member added to the organization.",
    };
  },
});
