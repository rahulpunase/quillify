import { v } from "convex/values";
import { query } from "../_generated/server";
export const getAll = query({
  args: {
    orgId: v.id("organizations"),
    filterByStarred: v.boolean(),
    searchField: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error("404");
    }

    if (!args.orgId) {
      return [];
    }

    const searchQuery = args.searchField;
    let boards = [];

    if (searchQuery) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("by_name", (q) =>
          q.search("name", searchQuery).eq("orgId", args.orgId)
        )
        .filter((q) => q.eq(q.field("isDeleted"), false))
        .filter((q) =>
          args.filterByStarred ? q.eq(q.field("isStarred"), true) : true
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .filter((q) =>
          q.and(
            q.eq(q.field("isDeleted"), false),
            args.filterByStarred ? q.eq(q.field("isStarred"), true) : true
          )
        )
        // .filter((q) =>
        //   // q.and(
        //   //   // q.eq(q.field("isDeleted"), false),
        //   //   // args.filterByStarred ? q.eq(q.field("isStarred"), true) : true,
        //   //   q.eq("orgId", args.orgId)
        //   // )
        //   q.eq("orgId", args.orgId)
        // )
        .collect();
    }

    return boards;
  },
});

export const get = query({
  args: {
    id: v.id("boards"),
  },
  handler: async (ctx, args) => {
    //TODO: Are you also the part of the organization in which the board exists;
    const board = await ctx.db
      .query("boards")
      .filter((q) => q.eq(q.field("_id"), args.id))
      .unique();
    return board;
  },
});
