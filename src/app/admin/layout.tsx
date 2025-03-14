"use client";

import SideBarAdmin from "@/components/page/sidebarAdmin";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <SidebarProvider>
        <SideBarAdmin />
        <section className="w-full">
          <div className="h-[64px] flex items-center border-b w-full">
            <SidebarTrigger />
          </div>
          <section className="p-3">{children}</section>
        </section>
      </SidebarProvider>
    </section>
  );
};

export default Layout;
