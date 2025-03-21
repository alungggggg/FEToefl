"use client";

import { Card } from "@/components/ui/card";
import { CrownIcon, Library, School, UsersRound } from "lucide-react";

const PageAdmin = () => {
  return (
    <div>
      <section className=" grid grid-cols-4 gap-4">
        <Card className="flex items-center p-4 gap-4">
          <div>
            <UsersRound size={50} strokeWidth={"1.5px"} stroke="#63c6ff" />
          </div>
          <div className="">
            <p className="text-sm uppercase font-light text-[#63c6ff]">
              Total Users
            </p>
            <p className="text-3xl font-semibold text-[#63c6ff]">2,555</p>
          </div>
        </Card>
        <Card className="flex items-center p-4 gap-4">
          <div>
            <School size={50} strokeWidth={"1.5px"} stroke="#63c6ff" />
          </div>
          <div className="">
            <p className="text-sm uppercase font-light text-[#63c6ff]">
              Total Class
            </p>
            <p className="text-3xl font-semibold text-[#63c6ff]">2,555</p>
          </div>
        </Card>
        <Card className="flex items-center p-4 gap-4">
          <div>
            <Library size={50} strokeWidth={"1.5px"} stroke="#63c6ff" />
          </div>
          <div className="">
            <p className="text-sm uppercase font-light text-[#63c6ff]">
              Bundler Soal
            </p>
            <p className="text-3xl font-semibold text-[#63c6ff]">50</p>
          </div>
        </Card>
        <Card className="flex items-center p-4 gap-4">
          <div>
            <CrownIcon size={50} strokeWidth={"1.5px"} stroke="#63c6ff" />
          </div>
          <div className="">
            <p className="text-sm uppercase font-light text-[#63c6ff]">
              Best Point
            </p>
            <p className="text-3xl font-semibold text-[#63c6ff]">Akhmal</p>
          </div>
        </Card>
      </section>
      <section className="grid grid-cols-3 gap-4 mt-4">
        <Card className="p-4">
          <h2>Upcoming Exam</h2>
          <ul>
            <li>Ujian 1</li>
            <li>Ujian 2</li>
            <li>Ujian 3</li>
          </ul>
        </Card>
      </section>
    </div>
  );
};

export default PageAdmin;
