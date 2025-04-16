"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { QuestionInterface } from "@/lib/interface";
import { getQuestion } from "@/lib/redux/slice/questionSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { ArrowLeft, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StructuringTable from "./_components/structuringTable";
import { useRouter } from "next/navigation";
import StructuringDialog from "./_components/structuringDialog";

const StructuringQuestion = () => {
    // search state
  const [searchParam, setSearchParam] = useState("");
  // search state

  // redux state
  const { data: questionData, isLoading } = useSelector(
    (state: RootState) => state.question
  );
  const dispatch = useDispatch<AppDispatch>();
  // redux action

  async function handleGetReadingQuestion() {
    const res = await dispatch(getQuestion("structure"));
    if (!getQuestion.fulfilled.match(res)) {
      console.log("success", res.payload);
    }
  }

  // filter data
  const filteredData = questionData.filter((item) => {
    return item.question.toLowerCase().includes(searchParam.toLowerCase());
  });
  // filter data

  //modal state
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dialogAction, setDialogAction] = useState<string>("");
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionInterface>();
  //modal state

  const router = useRouter();

  useEffect(() => {
    handleGetReadingQuestion();
  }, []);

  return (
    <section className="space-y-3">
      <Link className="flex gap-3" href={"./"}>
        <ArrowLeft />
        Structuring
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
        <>
          <div className="flex justify-between items-center">
            <Input
              className="w-1/3"
              type="search"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
            />
            <Button className="bg-[#1E56A0]" onClick={() => {
              router.push("./structuring/add");
            }}>
              <PlusIcon />
              Add Question
            </Button>
          </div>
          <StructuringTable
            questionData={filteredData}
            setIsOpen={setIsOpen}
            setDialogAction={setDialogAction}
            setSelectedQuestion={setSelectedQuestion}
          />
        </>
      )}
      <StructuringDialog
        isOpen={isOpen}
        dialogAction={dialogAction}
        setIsOpen={setIsOpen}
        selectedQuestion={selectedQuestion}
      />
    </section>
  );
}
 
export default StructuringQuestion;