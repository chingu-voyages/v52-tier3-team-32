"use client";
import Logo from "@/components/navbar/Logo";
import SignOutLink from "@/components/navbar/SignOutLink";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "@clerk/nextjs";
import clsx from "clsx";
import {
  CheckIcon,
  Home,
  MapIcon,
  ReceiptText,
  Table2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const controlItems = [
  {
    title: "Map View",
    url: "/admin/map-view",
    icon: MapIcon,
  },
  {
    title: "List View",
    url: "/admin/list-view",
    icon: Table2Icon,
  },
  {
    title: "Reports",
    url: "/admin/reports",
    icon: ReceiptText,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const { session } = useSession();
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center gap-4 pb-5">
        <Logo />
        <span className="font-bold text-lg">Solar Wise</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenuItem className="flex flex-row items-center gap-2 px-3 ">
          <SidebarMenuButton onClick={() => router.push("/")}>
            <Home />
            <span>Home</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <SidebarGroup>
          <SidebarGroupLabel>Admins Control</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {controlItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={clsx({
                      "bg-black bg-opacity-15": pathname === item.url,
                    })}
                  >
                    <Link
                      href={item.url}
                      className="w-full flex flex-row items-center justify-between"
                    >
                      <div className="flex flex-row gap-2">
                        <item.icon />
                        <span>{item.title}</span>
                      </div>
                      {pathname === item.url && <CheckIcon />}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        {session && (
          <div className="flex flex-row gap-3 items-center p-2 rounded-lg border">
            <Image
              src={session?.publicUserData.imageUrl ?? ""}
              alt=""
              height={35}
              width={35}
              className="rounded-full"
            />
            <span className=" font-semibold text-md">
              Hi, {session.publicUserData.firstName}
            </span>
          </div>
        )}
        <SignOutLink />
      </SidebarFooter>
    </Sidebar>
  );
}
