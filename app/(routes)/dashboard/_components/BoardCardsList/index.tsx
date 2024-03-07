import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import useGetOrgId from '@/lib/hooks/useGetOrgId';
import useDashboardStore from '@/store/dashboard';
import { useQuery } from 'convex/react';

import BoardCard from './BoardCard';

export type Board = {
  _id: Id<'boards'>;
  _creationTime: number;
  thumbnail?: string | undefined;
  name: string;
  authorId: string;
  orgId: string;
  isStarred: boolean;
  isPrivate: boolean;
  isDeleted: boolean;
};

const BoardCardList = ({ boards }: { boards?: Board[] }) => {
  const { selectedView } = useDashboardStore();
  const selectedOrgId = useGetOrgId();

  const members = useQuery(api.members.query.getAllMembersFromOrg, {
    orgId: selectedOrgId as Id<'organizations'>,
  });

  return boards?.map((board) => (
    <BoardCard
      view={selectedView}
      key={board._id}
      board={board}
      createdBy={members.find((member) => member.userId === board.authorId)}
    />
  ));
};

export default BoardCardList;
