import { getAll as getAllHelper } from 'convex-helpers/server/relationships.js';
import uniqBy from 'lodash/uniqBy';

import { query } from '../_generated/server';

export const getAll = query({
  args: {},
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();

    if (!user) {
      throw new Error('404');
    }

    const organizations = await ctx.db
      .query('organizations')
      .withIndex('by_author', (q) => q.eq('authorId', user.subject))
      .collect();

    const members = await ctx.db
      .query('members')
      .filter((q) => q.eq(q.field('userId'), user.subject))
      .collect();

    const memberOrganizations = await getAllHelper(
      ctx.db,
      members.map((member) => member.orgId),
    );

    const memberOrganizationsFiltered = memberOrganizations.filter((org) => !!org);

    return uniqBy([...organizations, ...memberOrganizationsFiltered], '_id');
  },
});
