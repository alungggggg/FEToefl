import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getQuestion } from "@/lib/redux/slice/questionSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { DialogTitle } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SelectedQuestionDialog = ({
  isOpen,
  setIsOpen,
  setSelectedQuestion,
  selectedQuestion,
  exams_id,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedQuestion: (question: any) => void;
  selectedQuestion: Array<{
    id_exam: string;
    id_quest: string;
  }>;
  exams_id: string;
}) => {
  const { data, isLoading } = useSelector((state: RootState) => state.question);
  const dispatch = useDispatch<AppDispatch>();

  async function handleGetReadingQuestion() {
    const res = await dispatch(getQuestion());
    if (!getQuestion.fulfilled.match(res)) {
      console.log("success", res.payload);
    }
  }

  useEffect(() => {
    handleGetReadingQuestion();
  }, []);

  return (
    <Dialog open={isOpen}>
      <DialogContent className="flex flex-col min-w-[1200px] max-h-[500px] overflow-y-auto items-start">
        <DialogHeader>
          <DialogTitle>Selected Questions</DialogTitle>
          <DialogDescription>
            Select the questions you want to add to the exam. You can select
            multiple questions at once.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input placeholder="search question" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question</TableHead>
              <TableHead className="w-6">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item , i) => (
              <TableRow key={i}>
                <TableCell className="truncate">{item.question}</TableCell>
                <TableCell>
                  <Button
                    className="bg-[#1E56A0]"
                    size={"sm"}
                    onClick={() => {
                      setSelectedQuestion((prev: any) => [
                        ...prev,
                        {
                          id_exam: exams_id,
                          id_quest: item.uuid,
                          question: item.question,
                        },
                      ]);
                      setIsOpen(false);
                    }}
                  >
                    <PlusIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <DialogFooter className="flex justify-between items-center w-full mt-3">
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SelectedQuestionDialog;
