import * as React from "react";
import {
  Leaf,
  LayoutDashboard,
  Cable,
  CircleGauge,
  Settings,
  Unplug,
  ArrowDownUp
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
import { Config } from "./settingsComponents/Config";

// This is sample data.
const data = {
  expertNav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      items: [],
    },
    {
      title: "Activités",
      url: "/dashboard/activities",
      items: [],
    },
    {
      title: "Données",
      url: "/dashboard",
      items: [
        {
          title: "Température",
          url: "/dashboard/moyenne/Température",
        },
        {
          title: "Humidité",
          url: "/dashboard/moyenne/Humidité",
        },
        {
          title: "Lumière",
          url: "/dashboard/moyenne/Lumière",
        },
        {
          title: "Pression atmosphérique",
          url: "/dashboard/moyenne/Pression atmosphérique",
        },
        {
          title: "Humidite du sol",
          url: "/dashboard/moyenne/Humidite du sol",
        },
        {
          title: "Co2",
          url: "/dashboard/moyenne/Co2",
        },
      ],
    },
    {
      title: "Capteurs",
      url: "/dashboard/capteur",
      items: [
        {
          title: "Capteur l1",
          url: "/dashboard/capteur/I1",
        },
        {
          title: "Capteur l2",
          url: "/dashboard/capteur/I2",
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
      title: `Capteur I${i}`,
      url: `/dashboard/capteur/I${i}`,
    });
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // Créer un état pour déterminer si les sous-menus "Données" et "Capteurs" sont ouverts
  const [activeSubMenu, setActiveSubMenu] = React.useState<"données" | "capteurs" | null>(null);

  const toggleSubMenu = (menu: "données" | "capteurs") => {
    // Si le sous-menu est déjà ouvert, le fermer, sinon l'ouvrir
    if (activeSubMenu === menu) {
      setActiveSubMenu(null); // Ferme le sous-menu si déjà ouvert
    } else {
      setActiveSubMenu(menu); // Ouvre le sous-menu
    }
  };

  return (
    <Sidebar
      variant="floating"
      {...props}
      className="bg-[hsl(var(--sidebar-background))]">
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
                      onClick={() => {
                        // Toggle submenus for "Données" and "Capteurs"
                        if (item.title === "Données") toggleSubMenu("données");
                        if (item.title === "Capteurs") toggleSubMenu("capteurs");
                      }}>
                      {item.title === "Dashboard" && <LayoutDashboard />}
                      {item.title === "Activités" && <ArrowDownUp />}
                      {item.title === "Données" && <CircleGauge />}
                      {item.title === "Capteurs" && <Cable />}
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </div>

                {item.items?.length > 0 && (item.title === "Données" || item.title === "Capteurs") && activeSubMenu && (
                  <SidebarMenuSub
                    className={`ml-0 border-l-0 px-1.5 max-h-[200px] overflow-y-auto transition-all duration-300 ${
                      activeSubMenu === (item.title === "Données" ? "données" : "capteurs") ? "block" : "hidden"
                    }`}>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title} className="border-l-2 ml-5">
                        <SidebarMenuSubButton asChild isActive={subItem.isActive}>
                          <Link href={subItem.url}>
                            {subItem.title} {subItem.title === "Capteur l1" && <Unplug />}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarFooter>
          <SidebarMenu />
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

