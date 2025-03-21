"use client";

import SideBarAdmin from "@/components/page/sidebarAdmin";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React, { useEffect, useState } from "react";
import NextTopLoader from "nextjs-toploader";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/fetchingCookie";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState<boolean>(true); // ✅ Tambahkan state untuk validasi login
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    async function checkToken() {
      const token = await getCookie();
      if (token) {
        localStorage.setItem("is_login", "true");
        setIsLogin(true);
      } else {
        router.replace("/login");
      }
      setIsChecking(false); // ✅ Tandai bahwa validasi selesai
    }

    checkToken();
  }, [router]);

  // ✅ Tampilkan layar loading sebelum validasi selesai
  if (isChecking) {
    return (
      <section className="w-screen h-screen flex items-center justify-center bg-white">
        <div className="text-lg font-semibold text-gray-700">Memeriksa autentikasi...</div>
      </section>
    );
  }

  // ✅ Jika validasi selesai dan user tidak login, tampilkan layar kosong
  if (!isLogin) {
    return <div className="w-screen h-screen flex items-center justify-center bg-white"></div>;
  }

  return (
    <section>
      <NextTopLoader showSpinner={false}/>
      <SidebarProvider>
        <SideBarAdmin />
        <section className="w-full">
          <div className="h-[64px] flex items-center border-b border-[#1E56A0]">
            <SidebarTrigger />
          </div>
          <section className="p-3">{children}</section>
        </section>
      </SidebarProvider>
    </section>
  );
};

export default Layout;
