"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOutIcon, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { getExamsByUserId } from "@/lib/redux/slice/examsSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { showDialog } from "@/lib/redux/slice/unautorizeDialogSlice";
import { ExamsInterface, QuestionInterface } from "@/lib/interface";
import { toeflApi } from "@/lib/axios/axios";
import { AxiosError } from "axios";

export type SplitedExamsInterface = Omit<ExamsInterface, "quest"> & {
  listening: QuestionInterface[];
  reading: QuestionInterface[];
  structure: QuestionInterface[];
};

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { data: examsData, isLoading } = useSelector(
    (state: RootState) => state.exams
  );

  // exam data with new interaface
  const splitedExamData = examsData as unknown as SplitedExamsInterface;
  // exam data with new interaface

  async function handleGetExamsData() {
    const res = await dispatch(getExamsByUserId());
    if (!getExamsByUserId.fulfilled.match(res)) {
      toast.error("somethink wrong");
      dispatch(showDialog());
    }
  }

  const [exitLoading, setExitLoading] = useState(false);
  async function handleExitExams(exam_id: string) {
    try {
      setExitLoading(true);
      const res = await toeflApi.post("exams/exit", {
        id_exam: exam_id,
      });
      if (res.status !== 200) {
        toast.error(res.data.response.data.message);
      } else {
        toast.success("successfully Exit exam");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response && error.response.data) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Unexpected error occurred");
        }
      }
    } finally {
      setExitLoading(false);
      handleGetExamsData();
    }
  }

  useEffect(() => {
    handleGetExamsData();
  }, []);

  return (
    <section>
      <div className="w-full flex items-center justify-between mb-4 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
        <div className="items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-700">My Quiz</h1>
          {/* <p className="text-sm text-gray-500">List of your quiz</p> */}
        </div>
        <Button
          className={`bg-blue-600 ${splitedExamData?.uuid ? " hidden" : ""}`}
          onClick={() => router.push("/quiz/my-quiz/join")}
        >
          <Plus /> Join Quiz
        </Button>
        <Button
          className={`bg-red-600 ${splitedExamData?.uuid ? "" : "hidden"}`}
          onClick={() => handleExitExams(splitedExamData?.uuid || "")}
          disabled={exitLoading}
        >
          <LogOutIcon /> Exit Quiz
        </Button>
      </div>
      {isLoading ? (
        <div className="flex flex-col gap-4 w-full bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md font-light">
          Loading....
        </div>
      ) : splitedExamData?.uuid ? (
        <section className="grid grid-cols-3 gap-4">
          {(["reading", "structure", "listening"] as const).map((item, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 w-full bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md"
            >
              <h1 className="text-2xl font-bold capitalize">{item}</h1>
              <div>
                <p className="text-sm text-gray-500">
                  Question: {splitedExamData?.[item]?.length || 0}
                </p>
                <p className="text-sm text-gray-500">Time: {"60"} minutes</p>
              </div>
              <div className="grid grid-cols-5 gap-2">
                <Button
                  className="bg-blue-600 col-span-5"
                  onClick={() =>
                    router.push(
                      "/quiz/my-quiz/" + splitedExamData?.uuid + "?type=" + item
                    )
                  }
                  disabled={exitLoading}
                >
                  Start
                </Button>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <section className="flex justify-center gap-4 w-full bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
          <div className="flex items-center flex-col space-y-1">
            <h1 className="text-xl font-semibold text-gray-700">
              You have not joined the exam room yet !!
            </h1>
            <p className="text-sm font-extralight text-gray-700">
              Please join an exam
            </p>
          </div>
        </section>
      )}
    </section>
  );
};

export default Page;
