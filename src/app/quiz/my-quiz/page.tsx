"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus, Trash2Icon } from "lucide-react";

const examList = [
  {
    id: 1,
    name: "Reading",
    question: 10,
    time: 10,
  },
  {
    id: 2,
    name: "Listening",
    question: 10,
    time: 10,
  },
  {
    id: 3,
    name: "Structuring",
    question: 10,
    time: 10,
  },
];

const Page = () => {
  const router = useRouter();
  return (
    <section>
      <div className="w-full flex items-center justify-between mb-4 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
        <div className="items-center gap-4">
          <h1 className="text-2xl font-bold">My Quiz</h1>
          {/* <p className="text-sm text-gray-500">List of your quiz</p> */}
        </div>
        <Button
          className="bg-blue-600"
          onClick={() => router.push("/quiz/my-quiz/join")}
        >
          <Plus /> Join Quiz
        </Button>
      </div>
      <section className="grid grid-cols-3 gap-4">
        {examList.map((exam) => (
          <div
            key={exam.name}
            className="flex flex-col gap-4 w-full bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md"
          >
            <h1 className="text-2xl font-bold">{exam.name}</h1>
            <div>
              <p className="text-sm text-gray-500">Question: {exam.question}</p>
              <p className="text-sm text-gray-500">Time: {exam.time} minutes</p>
            </div>
            <div className="grid grid-cols-5 gap-2">
              <Button
                className="bg-blue-600 col-span-4"
                onClick={() => router.push("/quiz/my-quiz/" + exam?.id)}
              >
                Start
              </Button>
              <Button className="bg-red-600">
                <Trash2Icon />
              </Button>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
};

export default Page;
