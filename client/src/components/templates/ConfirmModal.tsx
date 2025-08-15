import type {FC} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {CheckIcon} from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({open, setOpen, title, description, onConfirm, onCancel}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            className="bg-gray-200"
            onClick={() => {
              onCancel?.();
              setOpen(false);
            }}
          >
            No
          </Button>
          <Button
            variant="outline"
            className="bg-red-100"
            onClick={() => {
              onConfirm();
              setOpen(false);
            }}
          >
            Yes <CheckIcon/>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmModal;
