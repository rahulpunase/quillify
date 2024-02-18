import React, { PropsWithChildren } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Delete, FileKey, Pencil, Share, Tablet } from "lucide-react";

type DropDownMenuTriggerProps = {
  deleteBoard: () => void;
  isCreatedByYou: boolean;
} & PropsWithChildren;

const DropDownMenuForCard: React.FC<DropDownMenuTriggerProps> = ({
  children,
  deleteBoard,
  isCreatedByYou,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Share className="h-4 w-4" /> Share
        </DropdownMenuLabel>
        <DropdownMenuLabel>
          <Copy className="h-4 w-4" /> Copy Board Link
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {isCreatedByYou && (
          <DropdownMenuLabel>
            <Pencil className="h-4 w-4" /> Rename
          </DropdownMenuLabel>
        )}
        <DropdownMenuLabel>
          <Tablet className="h-4 w-4" /> Open in new Tab
        </DropdownMenuLabel>
        {isCreatedByYou && (
          <>
            <DropdownMenuLabel>
              <FileKey className="h-4 w-4" /> Make board private
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuLabel
              onClick={(ev) => {
                ev.preventDefault();
                deleteBoard();
              }}
            >
              <Delete className="h-4 w-4" /> Delete
            </DropdownMenuLabel>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownMenuForCard;
