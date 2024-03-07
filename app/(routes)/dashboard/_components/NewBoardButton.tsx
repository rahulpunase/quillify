'use client';

import useGetOrgId from '@/lib/hooks/useGetOrgId';
import { cn } from '@/lib/utils';
import { DashboardView } from '@/store/dashboard';
import useModalStore from '@/store/modals';
import { PlusIcon } from 'lucide-react';
import { toast } from 'sonner';

import CreateBoardPopup from './CreateBoardPopup';

const NewBoardButton = ({ view }: { view: DashboardView }) => {
  const { modal, setOpenModal } = useModalStore();
  const isListType = view === 'list';
  const selectedOrgId = useGetOrgId();

  return (
    <>
      <button
        disabled={!selectedOrgId}
        onClick={() => setOpenModal('new-board')}
        className={cn(
          'disabled:cursor-not-allowed transition animate-in fade-in',
          !isListType &&
            'bg-blue-600 w-[230px] rounded-md h-[280px] flex justify-center items-center hover:bg-blue-500 transition',
          isListType && 'flex flex-row gap-4 items-center group',
        )}
      >
        <div
          className={cn(
            !isListType && 'flex flex-col items-center',
            isListType && 'flex flex-row bg-blue-600 rounded-sm group-hover:bg-blue-500 transition',
          )}
        >
          <div>
            <PlusIcon className="text-white w-8 h-8" />
          </div>
          {!isListType && <div className="text-white font-light">New Board</div>}
        </div>
        {isListType && (
          <div className="text-zinc-600 font-light group-hover:text-zinc-900 group-hover:font-normal">New Board</div>
        )}
      </button>

      {modal === 'new-board' && (
        <CreateBoardPopup
          onOpenChange={() => setOpenModal('')}
          onBoardCreatedSuccessfully={() => {
            setOpenModal('');
            toast('Board created successfully');
          }}
        />
      )}
    </>
  );
};

export default NewBoardButton;
