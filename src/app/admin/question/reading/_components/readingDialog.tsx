import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { QuestionInterface } from "@/lib/interface";
import ViewReadingQuestion from "./viewReadingQuestion";
import DeleteReadingQuestion from "./deleteReadingQuestion";

const ReadingDialog = ({
  isOpen,
  setIsOpen,
  dialogAction,
  selectedQuestion,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  dialogAction: string;
  selectedQuestion: QuestionInterface | undefined;
}) => {
  console.log(selectedQuestion);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {dialogAction === "view" ? "View Question" : "Edit Question"}
          </DialogTitle>
        </DialogHeader>
        {dialogAction === "view" ? (
          <ViewReadingQuestion
            selectedQuestion={selectedQuestion}
            setIsOpen={setIsOpen}
          />
        ) : dialogAction === "delete" ? (
          <DeleteReadingQuestion  setIsOpen={setIsOpen} selectedQuestion={selectedQuestion}/>
        ) : (
          ""
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReadingDialog;
