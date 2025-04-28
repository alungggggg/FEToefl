"use client";

import Pagination from "@/app/admin/_components/page/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ExamTable from "@/app/admin/exam/_components/examTable";
import { PlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { getExams } from "@/lib/redux/slice/examsSlice";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import ExamDialog from "./_components/examDialog";
import { ExamsInterface } from "@/lib/interface";
import { showDialog } from "@/lib/redux/slice/unautorizeDialogSlice";

const ExamPage = () => {
  const { data: examsData, isLoading } = useSelector(
    (state: RootState) => state.exams
  );
  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();

  async function handleGetExamsData() {
    const res = await dispatch(getExams());
    if(!getExams.fulfilled.match(res)) {
      dispatch(showDialog())
    }
  }

  useEffect(() => {
    handleGetExamsData();
  }, []);

  // search state
  const [searchParam, setSearchParam] = useState<string>("");
  const filteredExamsData = examsData.filter(
    (exam) =>
      exam.name.toLowerCase().includes(searchParam.toLowerCase()) ||
      exam.code.toLowerCase().includes(searchParam.toLowerCase()) ||
      exam.access.toLowerCase().includes(searchParam.toLowerCase()) ||
      exam.expired.toLowerCase().includes(searchParam.toLowerCase())
  );
  // search state

  // dialog state
  const [open, setOpen] = useState(false);
  const [examsDataDialog, setExamsDataDialog] = useState<ExamsInterface>();
  const [action, setAction] = useState<string>("");
  // dialog state

  return (
    <section>
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
          <div className="flex justify-between items-center mb-3">
            <Input
              className="max-w-[300px]"
              placeholder="Search"
              type="search"
              value={searchParam}
              onChange={(e) => setSearchParam(e.target.value)}
            />
            <Button
              className="bg-[#1E56A0]"
              onClick={() => {
                router.push("/admin/exam/add");
              }}
            >
              <PlusIcon />
              Add Exam
            </Button>
          </div>
          <ExamTable
            examsData={filteredExamsData}
            setAction={setAction}
            setExamDialogData={setExamsDataDialog}
            setOpen={setOpen}
          />
          <div className="flex w-full justify-end mt-6">
            <Pagination
              dataLength={examsData.length}
              showedDataNumber={10}
              setShowedDataIndex={() => {}}
            />
          </div>
        </>
      )}
      <ExamDialog
        open={open}
        setOpen={setOpen}
        examsDataDialog={examsDataDialog}
        action={action}
      />
    </section>
  );
};

export default ExamPage;
