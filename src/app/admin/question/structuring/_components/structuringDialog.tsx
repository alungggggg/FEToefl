import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QuestionInterface } from "@/lib/interface";
import ViewStructuringQuestion from "./viewStructuringQuestion";
import DeleteStructuringQuestion from "./deleteStructuringQuestion";

const StructuringDialog = ({
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
    return (
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogAction === "view" ? "View Question" : "Edit Question"}
            </DialogTitle>
            <DialogDescription>
              {dialogAction === "view"
                ? "View the question details"
                : "Edit the question details"}
            </DialogDescription>
          </DialogHeader>
          {dialogAction === "view" ? (
            <ViewStructuringQuestion
              selectedQuestion={selectedQuestion}
              setIsOpen={setIsOpen}
            />
          ) : dialogAction === "delete" ? (
            <DeleteStructuringQuestion
              setIsOpen={setIsOpen}
              selectedQuestion={selectedQuestion}
            />
          ) : (
            ""
          )}
        </DialogContent>
      </Dialog>
    );
  };
 
export default StructuringDialog;