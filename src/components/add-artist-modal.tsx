import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

interface AddArtistModalProps {
  open: boolean;
  onClose: () => void;
}

export function AddArtistModal({ open, onClose }: AddArtistModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Artist</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-muted-foreground text-center">
            Add artist modal content will go here
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
