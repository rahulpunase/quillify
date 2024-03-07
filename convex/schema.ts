import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  organizations: defineTable({
    name: v.string(),
    authorId: v.string(),
    slug: v.optional(v.string()),
    inviteId: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    description: v.string(),
    type: v.optional(v.string()),
  }).index('by_author', ['authorId']),

  boards: defineTable({
    name: v.string(),
    authorId: v.string(),
    orgId: v.string(),
    isStarred: v.boolean(),
    thumbnail: v.optional(v.string()),
    isPrivate: v.boolean(),
    isDeleted: v.boolean(),
  })
    .index('by_author', ['authorId'])
    .index('by_org', ['orgId'])
    .index('by_author_organization', ['authorId', 'orgId'])
    .searchIndex('by_name', { searchField: 'name', filterFields: ['orgId'] }),

  documents: defineTable({
    name: v.string(),
    authorId: v.string(),
    orgId: v.string(),
    isDeleted: v.boolean(),
    type: v.string(),
    isPublished: v.boolean(),
    content: v.string(),
    parentDocument: v.optional(v.id('documents')),
    coverImage: v.optional(v.string()),
    icon: v.optional(v.string()),
  })
    .index('by_author', ['authorId'])
    .index('by_org', ['orgId'])
    .index('by_author_organization', ['authorId', 'orgId'])
    .index('by_user_parent', ['authorId', 'parentDocument']),

  users: defineTable({
    userId: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    pictureUrl: v.string(),
  }).index('by_userId', ['userId']),

  members: defineTable({
    userId: v.string(),
    orgId: v.id('organizations'),
    joinedThrough: v.string(),
    role: v.string(),
    joinedId: v.optional(v.string()),
  }),
});
