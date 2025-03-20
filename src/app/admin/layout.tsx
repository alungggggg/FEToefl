"use client";

import SideBarAdmin from "@/components/page/sidebarAdmin";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
// import { RootState } from "@/lib/redux/store";
import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import NextTopLoader from "nextjs-toploader";
import { useRouter } from "next/navigation";
import { getCookie } from "@/lib/fetchingCookie";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  // const { isLoading } = useSelector((state: RootState) => state.auth);
  const [checkLoading, setCheckLoading] = useState<boolean>();
  const [isLogin, setIsLogin] = useState<string | null>();

  //auth check token
  useEffect(() => {
    setIsLogin(localStorage.getItem("is_login"));
    async function checkToken() {
      setCheckLoading(false);
      const token = await getCookie();
      if (token) {
        localStorage.setItem("is_login", "true");
        setIsLogin("true");
      } else {
        router.push("/login");
      }
      setCheckLoading(true);
    }
    checkToken();
  }, []);
  //auth check token

  return (
    <section>
      <NextTopLoader />
      <SidebarProvider>
        <SideBarAdmin />
        <section className="w-full">
          <div className="h-[64px] flex items-center border-b border-[#1E56A0]">
            <SidebarTrigger />
          </div>
          <section className="p-3">{children}</section>
        </section>
      </SidebarProvider>
      {!(isLogin === "true") && checkLoading ? (
        <section className="w-screen h-screen bg-white/10 backdrop-blur-sm z-50 absolute top-0"></section>
      ) : (
        ""
      )}
    </section>
  );
};

export default Layout;
