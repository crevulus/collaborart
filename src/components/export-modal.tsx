import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

interface ExportModalProps {
  open: boolean;
  onClose: () => void;
}

export function ExportModal({ open, onClose }: ExportModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export Grid</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground text-center">
            Export modal content will go here
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
