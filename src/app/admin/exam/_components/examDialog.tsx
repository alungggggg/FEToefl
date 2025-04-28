import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ExamsInterface } from "@/lib/interface";
import { deleteExams, getExams } from "@/lib/redux/slice/examsSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { Copy, Link2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ExamDialog = ({
  open,
  setOpen,
  examsDataDialog,
  action,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  examsDataDialog: ExamsInterface | undefined;
  action: string;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.exams);
  const route = useRouter()

  async function handleDeleteExam() {
    const res = await dispatch(deleteExams(examsDataDialog?.uuid as string));
    if (deleteExams.fulfilled.match(res)) {
      toast.success("Exam deleted successfully");
    } else {
      toast.error("Failed to delete exam");
    }
    dispatch(getExams());
    setOpen(false);
  }
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "delete"
              ? "Delete Exam"
              : action == "show"
              ? "Exam Detail"
              : ""}
          </DialogTitle>
          <DialogDescription>
            This is the exam dialog. You can add, edit, or delete exams here.
          </DialogDescription>
        </DialogHeader>
        <div>
          {action === "delete" ? (
            "Are you sure you want to delete this exam?"
          ) : action == "show" ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name</label>
                <Input type="text" value={examsDataDialog?.name} readOnly />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="code">Code</label>
                <div className="relative">
                  <Input
                    id="code"
                    type="text"
                    value={examsDataDialog?.code}
                    readOnly
                    className="pr-10 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        examsDataDialog?.code as string
                      );
                      toast.success("Code copied to clipboard");
                    }}
                  />
                  <Copy className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="code">Access</label>
                <Input type="text" value={examsDataDialog?.access} readOnly />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="code">Expired</label>
                <Input type="text" value={examsDataDialog?.expired} readOnly />
              </div>
              <div className="flex flex-col gap-2 col-span-2">
                <label htmlFor="code">Question count</label>
                <Input
                  type="text"
                  value={examsDataDialog?.quest?.length}
                  readOnly
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <DialogFooter className="mt-6">
          <Button
            variant={"destructive"}
            onClick={handleDeleteExam}
            disabled={isLoading}
            className={action == "show" ? "hidden" : ""}
          >
            Delete
          </Button>
          <Button className={action != "show" ? "hidden" : ""} onClick={()=>route.push(`exam/${examsDataDialog?.uuid}/score`)}>
            <Link2Icon />
            View Attendance Report
          </Button>
          <Button
            variant={"outline"}
            onClick={() => setOpen(false)}
            disabled={isLoading}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ExamDialog;
