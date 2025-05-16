"use client";

import { Button } from "@/components/ui/button";
import { RootState } from "@/lib/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { SplitedExamsInterface } from "../../page";
import { useEffect } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const questionId = searchParams.get("question_id");
  const type = searchParams.get("type");
  const router = useRouter();

  const { data: examsData } = useSelector((state: RootState) => state.exams);

  const splitedExamData = examsData as unknown as SplitedExamsInterface;
  const examsDataByType =
    type == "reading"
      ? splitedExamData.reading
      : type == "structure"
      ? splitedExamData.structure
      : type == "listening"
      ? splitedExamData.listening
      : [];

  const selectedQuestion = examsDataByType?.filter(
    (item) => item.uuid == questionId
  );

  const selectedQuestionIndex = examsDataByType?.findIndex(
    (item) => item.uuid === questionId
  );

  useEffect(()=>{
    router.push(`./begin?type=${type}&question_id=${examsDataByType?.[0]?.uuid}`)
  },[examsDataByType])

  return (
    <section className="">
      <div className="">
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
          <p>{selectedQuestion?.[0]?.question as string}</p>
        </div>
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md mt-4">
          <div className="grid grid-cols-2 gap-2 text-sm">
            {selectedQuestion?.[0]?.options.map((item, i) => (
              <Button variant={"outline"} key={i} >
                {item.options}
              </Button>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8 w-full">
        <Button
          variant={"outline"}
          onClick={() =>
            router.push(
              `./begin?type=${type}&question_id=${
                examsDataByType[selectedQuestionIndex - 1].uuid
              }`
            )
          }
          disabled={selectedQuestionIndex <= 0}
        >
          Prev
        </Button>
        <Button
          variant={"outline"}
          onClick={() =>
            router.push(
              `./begin?type=${type}&question_id=${
                examsDataByType[selectedQuestionIndex + 1].uuid
              }`
            )
          }
          disabled={selectedQuestionIndex >= examsDataByType?.length - 1}
          className={
            selectedQuestionIndex >= examsDataByType?.length - 1 ? "hidden" : ""
          }
        >
          Next
        </Button>
        <Button
          variant={"default"}
          onClick={() => {
            console.log("submit");
          }}
          className={`bg-blue-600 ${
            selectedQuestionIndex >= examsDataByType?.length - 1 ? "" : "hidden"
          }`}
        >
          Submit
        </Button>
      </div>
    </section>
  );
};

export default Page;
