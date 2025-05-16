"use client";

import React, { Suspense, useEffect, useState } from "react";
import SidebarQuiz from "./_components/sidebarQuiz";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getCookie } from "@/lib/fetchingCookie";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { getUserProfile } from "@/lib/redux/slice/userProfileSlice";
import {
  hideDialog,
  showDialog,
} from "@/lib/redux/slice/unautorizeDialogSlice";
import UnautorizeDialog from "../admin/_components/unautorizeDialog";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { isLoading } = useSelector((state: RootState) => state.userProfile);

  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [isProfileChecking, setProfileIsChecking] = useState<boolean>(true);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { isShow } = useSelector((state: RootState) => state.sidebarHandler);

  async function fetchUserProfile() {
    dispatch(hideDialog());
    const res = await dispatch(getUserProfile()); // Dispatch the thunk action
    if (!getUserProfile.fulfilled.match(res)) {
      dispatch(showDialog());
    } else if (res.payload.role !== "PESERTA") {
      if (res.payload.role == "ADMIN") {
        router.push("/admin");
      } else {
        return <div>Not Found !!</div>;
      }
    }
    setProfileIsChecking(false);
  }

  useEffect(() => {
    async function handleGetCookie() {
      const { value: token } = await getCookie();
      if (!token) {
        router.replace("/login"); // ✅ Langsung redirect jika sudah login
      }
      setIsChecking(false); // ✅ Tandai bahwa validasi selesai
    }
    handleGetCookie();
    fetchUserProfile();
  }, [router]);

  // ✅ Jika masih mengecek, tampilkan loading screen
  if (isChecking || isLoading || isProfileChecking) {
    return (
      <section className="h-screen w-screen flex items-center justify-center bg-white">
        <p className="text-lg font-semibold text-gray-700">
          Memeriksa autentikasi...
        </p>
      </section>
    );
  }

  return (
    <Suspense>
      <section className="h-screen bg-[url('/background/signup-bg.jpg')] bg-cover">
        <SidebarProvider className="" open={isShow}>
          <SidebarQuiz />
          <section className="w-full">
            <div className="h-[64px] flex items-center border-b border-[#1E56A0] bg-blue-600/50 backdrop-blur-sm sticky top-0 z-10">
              <SidebarTrigger className={`${isShow ? "" : "hidden"}`} />
            </div>
            <section className="p-3 min-h-[calc(100vh-64px)]">
              {children}
            </section>
          </section>
        </SidebarProvider>
        {/* footer */}
        <footer className="w-full bg-white/50 backdrop-blur-sm border-t border-[#1E56A0] flex items-center justify-center py-5">
          <p className="text-sm text-gray-500">© 2023 Quiz App</p>
        </footer>
        <UnautorizeDialog />
      </section>
    </Suspense>
  );
};

export default Layout;
