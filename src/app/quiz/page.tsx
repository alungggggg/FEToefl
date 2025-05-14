'use client'

import { RootState } from "@/lib/redux/store";
import { SquarePenIcon } from "lucide-react";
import { useSelector } from "react-redux";

const Page = () => {
  const { data: usersProfile } = useSelector(
    (state: RootState) => state.userProfile
  );
  return (
    <section>
      {/* for profile */}
      <div className="w-full bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-gray-500">Manage your profile settings</p>

        <div className="flex gap-2 mt-4">
          <div className="text-center rounded-full w-20 h-20 flex items-center justify-center bg-red-500">
            <h1 className="text-3xl text-white font-semibold">YOO </h1>
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-semibold">{usersProfile?.name}</h1>
              <SquarePenIcon />
            </div>
            <p>{usersProfile?.username}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
