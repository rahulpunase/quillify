import { defineTable, defineSchema } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  organizations: defineTable({
    name: v.string(),
    authorId: v.string(),
    slug: v.string(),
    inviteUrl: v.string(),
    imageUrl: v.string(),
    description: v.string(),
    type: v.string(),
  }).index("by_author", ["authorId"]),
});
