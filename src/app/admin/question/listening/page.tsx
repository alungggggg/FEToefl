"use client";

import Link from "next/link";
import ListeningTable from "./_components/listeningTable";
import { ArrowLeft, PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { getQuestion } from "@/lib/redux/slice/questionSlice";
import { showDialog } from "@/lib/redux/slice/unautorizeDialogSlice";
import StructuringDialog from "../structuring/_components/structuringDialog";
import { QuestionInterface } from "@/lib/interface";

const ListeningPage = () => {
  const { data: questionData, isLoading } = useSelector(
    (state: RootState) => state.question
  );
  const [searchParam, setSearchParam] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const route = useRouter();

  async function getListeningQuestion() {
    const res = await dispatch(getQuestion("listening"));
    if (!getQuestion.fulfilled.match(res)) {
      dispatch(showDialog());
    }
  }

  useEffect(() => {
    getListeningQuestion();
  }, []);

  // dialog state
  const [isOpen, setIsOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState("view");
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionInterface>();
  // dialog state

  const displayedQuestion = questionData.filter((question) => {
    return (
      (question.question as string)
        .toLowerCase()
        .includes(searchParam.toLowerCase()) ||
      question.answer.toLowerCase().includes(searchParam.toLowerCase())
    );
  });
  return (
    <section className="space-y-3">
      <Link className="flex gap-3" href={"./"}>
        <ArrowLeft />
        Listening
      </Link>
      <hr className="w-full" />
      {isLoading ? (
        <section>
          <div className="flex justify-between items-center mb-3">
            <Skeleton className="h-8 w-[300px]" />
            <Skeleton className="h-8 w-[150px]" />
          </div>
          <div className="grid grid-cols-12 gap-y-3">
            <Skeleton className="col-span-12 h-8" />
            <Skeleton className="col-span-12 h-8" />
            <Skeleton className="col-span-12 h-8" />
          </div>
        </section>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-3">
            <Input
              type="text"
              placeholder="Search by question"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
              className="w-1/3 mb-4"
            />
            <Button
              className="bg-[#1E56A0]"
              onClick={() => {
                route.push("/admin/question/listening/add");
              }}
            >
              <PlusIcon /> Add Question
            </Button>
          </div>
          <ListeningTable
            questionData={displayedQuestion}
            setIsOpen={setIsOpen}
            setDialogAction={setDialogAction}
            setSelectedQuestion={setSelectedQuestion}
          />
        </div>
      )}
      <StructuringDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dialogAction={dialogAction}
        selectedQuestion={selectedQuestion}
      />
    </section>
  );
};

export default ListeningPage;
