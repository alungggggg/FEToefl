import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

const CameraDialog = ({
  isShow,
  onRetry,
  isLoading,
}: {
  isShow: boolean;
  onRetry: () => void;
  isLoading: boolean;
}) => {
  return (
    <Dialog open={isShow}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600 font-semibold text-xl">
            Camera Not Found !!
          </DialogTitle>
          <DialogDescription>
            Please turn on / allow camera permission to continue exam
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={onRetry} disabled={isLoading}>
            {isLoading ? <>Trying...</> : "Turn On Camera"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CameraDialog;
