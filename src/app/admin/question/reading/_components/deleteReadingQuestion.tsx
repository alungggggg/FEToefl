import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { QuestionInterface } from "@/lib/interface";
import { deleteQuestion } from "@/lib/redux/slice/questionSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const DeleteReadingQuestion = ({
  setIsOpen,
  selectedQuestion,
}: {
  setIsOpen: (isOpen: boolean) => void;
  selectedQuestion: QuestionInterface | undefined;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector(
    (state: RootState) => state.question
  );

  async function handledeleteQuestion() {
    if (selectedQuestion) {
      const res = await dispatch(
        deleteQuestion(selectedQuestion.uuid || "")
      );
      if (deleteQuestion.fulfilled.match(res)) {
        toast.success("Successfully delete reading question");
      } else {
        toast.error("Failed to delete reading question");
      }
      setIsOpen(false);
    }
  }
  return (
    <>
      <h1>Delete Reading Question</h1>
      <DialogFooter>
        <Button
          type="submit"
          form="submitReadingQuestion"
          className="bg-red-500 hover:bg-red-600 text-white"
          disabled={isLoading}
          onClick={handledeleteQuestion}
        >
          Delete Question
        </Button>
        <Button
          type="button"
          className="bg-gray-500 hover:bg-gray-600 text-white"
          onClick={() => setIsOpen(false)}
          disabled={isLoading}
        >
          Cancel
        </Button>
      </DialogFooter>
    </>
  );
};

export default DeleteReadingQuestion;
