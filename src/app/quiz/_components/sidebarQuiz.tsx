"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { RootState } from "@/lib/redux/store";
import {
  BadgeCheck,
  BookIcon,
  ChevronsUpDown,
  HomeIcon,
  LogOut,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const items = [
  {
    title: "Profile",
    url: "/quiz/",
    icon: HomeIcon,
  },
  {
    title: "My Quiz",
    url: "/quiz/my-quiz",
    icon: BookIcon,
  },
];
const SidebarQuiz = () => {
  const path = usePathname();
  const currentRoute = path?.split("/")[2] || "dashboard";

  return (
    <Sidebar className="border-r-[0.5px] border-[#163172]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#1E56A0] text-sidebar-primary-foreground">
                  <BadgeCheck className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">TOEFL</span>
                  <span className="truncate text-xs">nothing</span>
                </div>
              </SidebarMenuButton>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className={`ps-2 ${
                    currentRoute == item.title.toLowerCase()
                      ? "bg-blue-50 border-r-8 border-[#1E56A0]"
                      : ""
                  }`}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
};

export default SidebarQuiz;

function NavUser() {
  const { isMobile } = useSidebar();

  const router = useRouter();

  const { data: usersProfile } = useSelector(
    (state: RootState) => state.userProfile
  );

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={"https://placehold.co/600x400"}
                  alt={"test"}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {usersProfile.name.split(" ")[0] +
                    " " +
                    usersProfile?.name?.split(" ")?.[1] || ""}
                </span>
                <span className="truncate text-xs">
                  {usersProfile?.username || "undefined"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={"https://placehold.co/600x400"}
                    alt={"test"}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {usersProfile?.name?.split(" ")[0] +
                      " " +
                      usersProfile?.name?.split(" ")?.[1] || ""}
                  </span>
                  <span className="truncate text-xs">
                    {usersProfile?.username || "undefined"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={()=>{
              router.push("/login")
            }}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
