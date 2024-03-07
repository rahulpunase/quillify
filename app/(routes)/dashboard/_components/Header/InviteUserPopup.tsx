import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import useGetOrgId from '@/lib/hooks/useGetOrgId';
import useModalStore from '@/store/modals';
import useOrganizationStore from '@/store/organization';
import { useMutation, useQuery } from 'convex/react';
import { randomBytes } from 'crypto';
import { Copy, CopyCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const InviteUserPopup = () => {
  const { setOpenModal } = useModalStore();
  const selectedOrgId = useGetOrgId();
  const [inviteUrl, setInviteUrl] = useState('');
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  const getOrganization = useQuery(api.organization.query.getAll);

  const generateLink = (randomId: string) => {
    const url = new URL(window.location.href);
    const origin = url.origin;
    return origin + `/invite-member/${randomId}` + `?orgId=${selectedOrgId}`;
  };

  useEffect(() => {
    if (!inviteUrl) {
      const organization = getOrganization?.find((org) => org._id === selectedOrgId);
      if (!organization || !organization.inviteId) return;
      setInviteUrl(generateLink(organization.inviteId));
    }
  }, [getOrganization, selectedOrgId]);

  const updateInviteUrl = useMutation(api.organization.mutation.updateInviteUrl);

  const generateLinkClickHandler = async () => {
    const randomId = randomBytes(20).toString('hex');
    const inviteUrl = generateLink(randomId);
    await updateInviteUrl({
      id: selectedOrgId as Id<'organizations'>,
      inviteId: randomId,
    });
    setInviteUrl(inviteUrl);
  };

  const copyLinkToClipBoard = () => {
    if (!inviteUrl) return;
    navigator.clipboard.writeText(inviteUrl);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  return (
    <Dialog open onOpenChange={() => setOpenModal('')}>
      <DialogContent>
        <DialogHeader>Invite members to the organization</DialogHeader>
        <DialogDescription>
          Generate an invite url or send mail to the users you want to invite with the generate url link
        </DialogDescription>

        <div className="flex flex-row items-end gap-x-2">
          <Input readOnly value={inviteUrl} />
          <Button variant="outline" onClick={copyLinkToClipBoard} disabled={!inviteUrl}>
            {isLinkCopied ? <CopyCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <Button onClick={generateLinkClickHandler}>Generate invite link</Button>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserPopup;
