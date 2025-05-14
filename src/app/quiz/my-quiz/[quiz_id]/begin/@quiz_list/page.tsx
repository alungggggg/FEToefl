"use client";

import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const questionId = searchParams.get("question_id");

  return (
    <section className="grid grid-cols-5 gap-2 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
      {[...Array(50).keys()].map((item) => (
        <Button
          key={item}
          variant={"outline"}
          className={`${
            questionId === item.toString() ? "bg-blue-600 text-white" : ""
          } col-span-1`}
          onClick={() =>
            router.push("/quiz/my-quiz/123/begin?question_id=" + item)
          }
        >
          {item}
        </Button>
      ))}
    </section>
  );
};

export default Page;
