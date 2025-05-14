"use client";

import SideBarAdmin from "@/app/admin/_components/page/sidebarAdmin";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import NextTopLoader from "nextjs-toploader";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/fetchingCookie";
import UnautorizeDialog from "./_components/unautorizeDialog";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import {
  hideDialog,
  showDialog,
} from "@/lib/redux/slice/unautorizeDialogSlice";
import { getUserProfile } from "@/lib/redux/slice/userProfileSlice";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState<boolean>(true); // ✅ Tambahkan state untuk validasi login
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const { data: userProfile, isLoading } = useSelector(
    (state: RootState) => state.userProfile
  );

  async function fetchUserProfile() {
    const res = await dispatch(getUserProfile()); // Dispatch the thunk action
    if (!getUserProfile.fulfilled.match(res)) {
      dispatch(showDialog());
    } else if (res.payload.role !== "ADMIN") {
      if (res.payload.role == "PESERTA") {
        router.push("/quiz");
      } else {
        return <div>Not Found !!</div>;
      }
    }
  }

  useEffect(() => {
    async function checkToken() {
      // hide dialog
      dispatch(hideDialog());
      // hide dialog
      const token = await getCookie();
      if (token) {
        localStorage.setItem("is_login", "true");
        setIsLogin(true);
      } else {
        router.replace("/login");
      }
      setIsChecking(false); // ✅ Tandai bahwa validasi selesai
    }

    fetchUserProfile();
    checkToken();
  }, [router]);

  // ✅ Tampilkan layar loading sebelum validasi selesai
  if (isChecking || isLoading) {
    return (
      <section className="w-screen h-screen flex items-center justify-center bg-white">
        <div className="text-lg font-semibold text-gray-700">
          Memeriksa autentikasi...
        </div>
      </section>
    );
  }

  // ✅ Jika validasi selesai dan user tidak login, tampilkan layar kosong
  if (!isLogin) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white"></div>
    );
  }

  return (
    <section>
      <NextTopLoader showSpinner={false} />
      <SidebarProvider>
        <SideBarAdmin userProfile={userProfile} />
        <section className="w-full">
          <div className="h-[64px] flex items-center border-b border-[#1E56A0]">
            <SidebarTrigger />
          </div>
          <section className="p-3">{children}</section>
        </section>
        <UnautorizeDialog />
      </SidebarProvider>
    </section>
  );
};

export default Layout;
