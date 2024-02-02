import { query } from "./_generated/server";

import { v } from "convex/values";

export const getOrganization = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("404");
    }

    const organizations = await ctx.db
      .query("organizations")
      .filter((q) => q.eq(q.field("authorId"), user.id));

    return organizations;
  },
});
