"use client";

import Pagination from "@/components/page/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ExamTable from "@/app/admin/exam/_components/examTable";
import { PlusIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { getExams } from "@/lib/redux/slice/examsSlice";
import { useEffect } from "react";

const ExamPage = () => {
  const { data: examsData, isLoading } = useSelector(
    (state: RootState) => state.exams
  );
  const dispatch = useDispatch<AppDispatch>();

  async function handleGetExamsData() {
    const res = await dispatch(getExams());
  }

  useEffect(() => {
    handleGetExamsData();
  }, []);

  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <Input
          className="max-w-[300px]"
          placeholder="Search"
          type="search"
          //   value={searchParam}
          //   onChange={(e) => setSearchParam(e.target.value)}
        />
        <Button
          className="bg-[#1E56A0]"
          //   onClick={() => {
          //     setIsOpen(true);
          //     setDialogAction("add");
          //   }}
        >
          <PlusIcon />
          Add Exam
        </Button>
      </div>
      <ExamTable examsData={examsData} />
      <div className="flex w-full justify-end mt-6">
        <Pagination
          dataLength={examsData.length}
          showedDataNumber={10}
          setShowedDataIndex={() => {}}
        />
      </div>
    </section>
  );
};

export default ExamPage;
