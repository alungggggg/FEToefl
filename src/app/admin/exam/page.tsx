"use client"

import Pagination from "@/components/page/pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ExamTable from "@/app/admin/exam/_components/examTable";
import { PlusIcon } from "lucide-react";

const ExamPage = () => {
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
          Add Exam <PlusIcon />
        </Button>
      </div>
      <ExamTable />
      <div className="flex w-full justify-end mt-6">
        <Pagination
          dataLength={20}
          showedDataNumber={10}
          setShowedDataIndex={() => {}}
        />
      </div>
    </section>
  );
};

export default ExamPage;
