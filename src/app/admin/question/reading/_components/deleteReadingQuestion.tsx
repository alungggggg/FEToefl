import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { QuestionInterface } from "@/lib/interface";

const DeleteReadingQuestion = ({
  setIsOpen,
  selectedQuestion,
}: {
  setIsOpen: (isOpen: boolean) => void;
  selectedQuestion: QuestionInterface | undefined;
}) => {
  return (
    <>
      <h1>Delete Reading Question</h1>
      <DialogFooter>
        <Button
          type="submit"
          form="submitReadingQuestion"
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          Delete Question
        </Button>
        <Button
          type="button"
          className="bg-gray-500 hover:bg-gray-600 text-white"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
      </DialogFooter>
    </>
  );
};

export default DeleteReadingQuestion;
