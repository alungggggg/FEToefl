"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getScore } from "@/lib/redux/slice/scoreSlice";
import { showDialog } from "@/lib/redux/slice/unautorizeDialogSlice";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { ArrowLeft, PrinterIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ExamScore = () => {
  const { slug } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data: scoreData, isLoading } = useSelector(
    (state: RootState) => state.score
  );

  async function handleGetScore() {
    if (typeof slug === "string") {
      const res = await dispatch(getScore({ id_exam: slug }));
      if(!getScore.fulfilled.match(res)) {
        dispatch(showDialog())
      }
    } else {
      console.error("Invalid slug type");
    }
  }

  useEffect(() => {
    handleGetScore();
  }, []);

  return (
    <div className="space-y-3">
      <div>
        <Link href={"/admin/exam"} className="flex items-center gap-2">
          <ArrowLeft /> Attendance Report
        </Link>
      </div>
      <hr />
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
          <div className="flex justify-between">
            <Input className="w-1/3" />
            <Button className="bg-blue-600">
              <PrinterIcon />
              Print
            </Button>
          </div>
          <Table>
            <TableHeader className="bg-[#1E56A0] text-white">
              <TableRow>
                <TableHead className="text-white">No</TableHead>
                <TableHead className="text-white">Name</TableHead>
                <TableHead className="text-white">Username</TableHead>
                <TableHead className="text-white">Score</TableHead>
                <TableHead className="text-white">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scoreData.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.username}</TableCell>
                  <TableCell>{item.score}</TableCell>
                  <TableCell>{item.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )}
    </div>
  );
};

export default ExamScore;
