import { Button } from '@/components/ui/button';
import { TooltipWrapper } from '@/components/ui/tooltip';
import { LucideIcon } from 'lucide-react';

type ToolButtons = {
  label: string;
  Icon: LucideIcon;
  onClick: () => void;
  isActive: boolean;
  isDisabled: boolean;
};

const ToolButton = ({ label, Icon, onClick, isActive, isDisabled }: ToolButtons) => {
  return (
    <TooltipWrapper content={label}>
      <Button variant={isActive ? 'tool' : 'ghost'} size="icon" disabled={isDisabled} onClick={onClick}>
        <Icon className="size-4" />
      </Button>
    </TooltipWrapper>
  );
};

export default ToolButton;
