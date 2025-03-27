"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ReadingTable from "./_components/readingTable";

const ReadingPage = () => {
  const [searchParam, setSearchParam] = useState("");
  return (
    <section className="space-y-3">
      <Link className="flex gap-3" href={"./"}>
        <ArrowLeft />
        Reading
      </Link>
      <hr className="w-full" />
      <div className="flex justify-between items-center">
        <Input
          className="w-1/3"
          type="search"
          value={searchParam}
          onChange={(e) => setSearchParam(e.target.value)}
        />
        <Button className="bg-[#1E56A0]">
          <PlusIcon />
          Add Question
        </Button>
      </div>
      <ReadingTable />
    </section>
  );
};

export default ReadingPage;
