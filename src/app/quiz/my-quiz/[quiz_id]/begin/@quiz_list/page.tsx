"use client";

import { Button } from "@/components/ui/button";
import { RootState } from "@/lib/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { SplitedExamsInterface } from "../../../page";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const questionId = searchParams.get("question_id");
  const type = searchParams.get("type");

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

  return (
    <section className="grid grid-cols-5 gap-2">
      {examsDataByType?.map((item, i) => (
        <Button
          key={i}
          variant={"outline"}
          className={`${
            questionId === item?.uuid?.toString() ? "bg-blue-600 text-white" : ""
          } col-span-1`}
          onClick={() =>
            router.push(`./begin?type=${type}&question_id=${item?.uuid}`)
          }
        >
          {i + 1}
        </Button>
      ))}
    </section>
  );
};

export default Page;
