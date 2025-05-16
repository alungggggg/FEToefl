"use client";

import { getExamsByUserId } from "@/lib/redux/slice/examsSlice";
import { AppDispatch } from "@/lib/redux/store";
// import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import { SplitedExamsInterface } from "../../page";
import { hideSidebar } from "@/lib/redux/slice/sidebarHandler";

const Layout = ({
  children,
  camera,
  quiz_list,
}: {
  children: React.ReactNode;
  camera: React.ReactNode;
  quiz_list: React.ReactNode;
}) => {
  // const searchParams = useSearchParams();
  // const type = searchParams.get("type");

  // const { data: examsData } = useSelector(
  //   (state: RootState) => state.exams
  // );
  const dispatch = useDispatch<AppDispatch>();

  // const splitedExamData = examsData as unknown as SplitedExamsInterface;
  // const examsDataByType =
  //   type == "reading"
  //     ? splitedExamData.reading
  //     : type == "structure"
  //     ? splitedExamData.structure
  //     : type == "listening"
  //     ? splitedExamData.listening
  //     : [];

  useEffect(() => {
    async function handleGetExams() {
      await dispatch(getExamsByUserId());
    }
    async function handleHideSidebar() {
      dispatch(hideSidebar());
    }
    handleHideSidebar();
    handleGetExams();
  }, []);

  return (
    <section>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
          <div className="flex flex-col gap-y-4">
            <div className="col-span-8 h-fit justify-start bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
              <p className="text-lg font-bold text-center">00:00:00</p>
            </div>
            <div>{camera}</div>
          </div>
        </div>
        <div className="col-span-8 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">
          {children}
        </div>
        <div className="col-span-2 bg-white/70 backdrop-blur-sm p-4 rounded-lg shadow-md">{quiz_list}</div>
      </div>
    </section>
  );
};

export default Layout;
