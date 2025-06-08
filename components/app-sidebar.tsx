"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {
  Home,
  Calendar,
  Search,
  BookOpen,
  Folder,
  User2,
  MoreVertical,
} from "lucide-react";

const items = [
  { title: "Home", url: "/#", icon: Home },
  { title: "Events", url: "/events", icon: Calendar },
  { title: "Courses", url: "/#", icon: BookOpen },
  { title: "Projects", url: "/#", icon: Folder },
];

export function AppSidebar() {
  const avatarUrl = "/images/pfp.jpg";
  const userName = "John Smith";
  const userEmail = "eminence_of_shadow@gmail.com";
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="mb-2 text-white text-base font-semibold flex gap-2  ">
            <img
              src="/images/logo.png"
              alt="Schedly logo"
              className="h-7 w-7 object-contain"
            />
            Schedly
          </SidebarGroupLabel>
          <div className="w-full h-px bg-white my-2" />
          <SidebarGroupContent>
            <SidebarMenu className="gap-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2 hover:bg-zinc-700">
                      <item.icon className="!h-5 !w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex items-center gap-3 ">
                  {/* Avatar only */}
                  <div className="w-8 h-8 flex-shrink-0">
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="w-8 h-8 rounded-sm object-cover"
                    />
                  </div>

                  {/* Name + Email (stacked) */}
                  <div className="flex flex-col leading-tight truncate">
                    <span className="text-sm font-medium truncate">
                      {userName}
                    </span>
                    <span className="text-xs text-muted-foreground truncate">
                      {userEmail}
                    </span>
                  </div>

                  <MoreVertical className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
