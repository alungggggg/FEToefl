import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
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
} from "../../../../components/ui/sidebar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import {
  BadgeCheck,
  ChevronsUpDown,
  HomeIcon,
  Layers,
  LogOut,
  Newspaper,
  UserRound,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { signOut } from "@/lib/redux/slice/authSlice";
import { UsersProfileInterface } from "@/lib/redux/slice/userProfileSlice";

const SideBarAdmin = ({
  userProfile,
}: {
  userProfile: UsersProfileInterface;
}) => {
  const path = usePathname();
  const currentRoute = path?.split("/")[2] || "dashboard";

  const items = [
    { title: "Dashboard", url: "/admin/", icon: HomeIcon },
    { title: "Users", url: "/admin/users", icon: UserRound },
    { title: "Question", url: "/admin/question", icon: Layers },
    { title: "Exam", url: "/admin/exam", icon: Newspaper },
  ];
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
        <NavUser userProfile={userProfile} />
      </SidebarFooter>
    </Sidebar>
  );
};

function NavUser({ userProfile }: { userProfile: UsersProfileInterface }) {
  const { isMobile } = useSidebar();

  // redux variable
  const dispatch = useDispatch<AppDispatch>();
  // redux variable

  const router = useRouter();

  async function handleLogout() {
    // Add your logout logic here
    const res = await dispatch(signOut());
    if (res.type === "auth/signOut/fulfilled") {
      router.push("/login");
    } else {
      await fetch("/api/auth", {
        method: "DELETE",
      });
      router.push("/login");
    }
  }
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
                  {userProfile.name.split(" ")[0] +
                    " " +
                    userProfile.name.split(" ")[1]}
                </span>
                <span className="truncate text-xs">{userProfile.username}</span>
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
                    {userProfile.name.split(" ")[0] +
                      " " +
                      userProfile.name.split(" ")[1]}
                  </span>
                  <span className="truncate text-xs">
                    {userProfile.username}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500" onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default SideBarAdmin;
