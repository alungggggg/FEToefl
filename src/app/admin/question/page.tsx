"use client";

import { BookOpenText, List, NotebookPen, Speaker, Volume2 } from "lucide-react";
import Link from "next/link";

const questionType = [
  {
    name: "Listening",
    link: "question/listening",
    icon: Volume2,
    count: 200,
  },
  {
    name: "Reading",
    link: "question/reading",
    icon: BookOpenText,
    count: 200,
  },
  {
    name: "Structure",
    link: "question/structuring",
    icon: NotebookPen,
    count: 200,
  },
];

const QuestionPage = () => {
  return (
    <section className="grid grid-cols-1 gap-3">
      {questionType.map((item) => (
        <div className="border rounded-md bg-blue-100 p-3 flex items-center justify-between" key={item.name}>
          <div className="flex gap-3 items-center">
            <item.icon size={40} strokeWidth={1.5} />
            <div>
              <h1 className="text-lg font-semibold">{item.name}</h1>
              <p className="leading-3 text-sm font-light">{item.count}</p>
            </div>
          </div>
          <Link href={item.link}>
            <List />
          </Link>
        </div>
      ))}
    </section>
  );
};

export default QuestionPage;
