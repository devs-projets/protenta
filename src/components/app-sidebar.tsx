import * as React from "react";
import {
  Leaf,
  LayoutDashboard,
  Cable,
  CircleGauge,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Config } from "./Config";

// This is sample data.
const data = {
  expertNav: [
    {
      title: "Dashboard",
      url: "/dashboard/experts",
      items: [],
    },
    {
      title: "Données",
      url: "/dashboard/experts",
      items: [
        {
          title: "Température",
          url: "/dashboard/experts/moyenne/Température",
        },
        {
          title: "Humidité",
          url: "/dashboard/experts/moyenne/Humidité",
        },
        {
          title: "Lumière",
          url: "/dashboard/experts/moyenne/Lumière",
        },
        {
          title: "Pression atmosphérique",
          url: "/dashboard/experts/moyenne/Pression atmosphérique",
        },
        {
          title: "Humidite du sol",
          url: "/dashboard/experts/moyenne/Humidite du sol",
        },
        {
          title: "Co2",
          url: "/dashboard/experts/moyenne/Co2",
        },
      ],
    },
    {
      title: "Capteurs",
      url: "/dashboard/experts/capteur",
      items: [
        {
          title: "Capteur l1",
          url: "/dashboard/experts/capteur/Capteur l1",
        },
        {
          title: "Capteur l2",
          url: "/dashboard/experts/capteur/Capteur l2",
          isActive: true,
        },
      ],
    },
  ],
};

const capteursMenu = data.expertNav.find(
  (navItem) => navItem.title === "Capteurs"
);

if (capteursMenu) {
  for (let i = 3; i <= 15; i++) {
    capteursMenu.items.push({
      title: `Capteur l${i}`,
      url: `/dashboard/experts/capteur/Capteur l${i}`,
    });
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      variant="floating"
      {...props}
      className="bg-[hsl(var(--sidebar-background))]"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
                  <Leaf className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Protenta</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.expertNav.map((item) => (
              <SidebarMenuItem key={item.title}>
                <div>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="font-medium hover:bg-primary"
                    >
                      {item.title === "Dashboard" && <LayoutDashboard />}
                      {item.title === "Données" && <CircleGauge />}
                      {item.title === "Capteurs" && <Cable />}
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </div>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5 max-h-[200px] overflow-y-auto LongMenu">
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem
                        key={subItem.title}
                        className="border-l-2 ml-5"
                      >
                        <SidebarMenuSubButton
                          asChild
                          isActive={subItem.isActive}
                        >
                          <Link href={subItem.url}>{subItem.title}</Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem></SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarMenu></SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div>
              <SidebarMenuButton asChild className="hover:bg-primary">
                <Config />
              </SidebarMenuButton>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
