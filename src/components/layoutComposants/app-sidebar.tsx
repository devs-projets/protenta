import * as React from "react";
import {
  Leaf,
  LayoutDashboard,
  Cable,
  CircleGauge,
  Unplug,
  ArrowDownUp,
  ChevronUp,
  ChevronDown,
  Sprout
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
import { Config } from "@/components/settingsComponents/Config";
import { usePathname } from "next/navigation";
import {Users} from "lucide-react";

// This is sample data.
const data = {
  expertNav: [
    {
      title: "Dashboard",
      url: "/dashboard",
      items: [],
    },
    {
      title: "Cultures",
      url: "/dashboard/cultures",
      items: [],
    },
    {
      title: "Journal",
      url: "/dashboard/activities",
      items: [],
    },
    {
      title: "Utilisateurs",
      url: "/dashboard/user-management",
      items: []
    },
    {
      title: "Données",
      url: "#",
      items: [
        {
          title: "Température",
          url: "/dashboard/moyenne/temperature",
        },
        {
          title: "Humidité",
          url: "/dashboard/moyenne/humidite",
        },
        {
          title: "Lumière",
          url: "/dashboard/moyenne/lumiere",
        },
        {
          title: "Pression atmosphérique",
          url: "/dashboard/moyenne/pressionatm",
        },
        {
          title: "Humidite du sol",
          url: "/dashboard/moyenne/humditesol",
        },
        {
          title: "CO₂",
          url: "/dashboard/moyenne/co2",
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
  const [activeSubMenu, setActiveSubMenu] = React.useState<
    "données" | "capteurs" | null
  >(null);
  const pathname = usePathname();

  const toggleSubMenu = (menu: "données" | "capteurs") => {
    // Alterne entre ouvrir et fermer le sous-menu
    setActiveSubMenu((prev) => (prev === menu ? null : menu));
  };

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
                  <span className="font-semibold">Serre du Sahel </span>
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
                      className="font-medium flex items-center justify-between hover:bg-green-600"
                    >
                      <div className="flex items-center gap-2">
                        {item.title === "Dashboard" && <LayoutDashboard />}
                        {item.title === "Journal" && <ArrowDownUp />}
                        {item.title === "Utilisateurs" && <Users />}
                        {item.title === "Données" && <CircleGauge />}
                        {item.title === "Capteurs" && <Cable />}
                        {item.title === "Cultures" && <Sprout />}
                        {item.title}
                      </div>

                      {/* Affichage conditionnel des chevrons */}
                      {item.items?.length > 0 && (
                        <div
                          className="ml-auto flex items-center"
                          onClick={(e) => {
                            // Empêche le lien d'être suivi pour "Données" et "Capteurs"
                            if (
                              item.title === "Données" ||
                              item.title === "Capteurs"
                            ) {
                              e.preventDefault();
                              toggleSubMenu(
                                item.title === "Données"
                                  ? "données"
                                  : "capteurs"
                              );
                            }
                          }}
                        >
                          {activeSubMenu ===
                          (item.title === "Données"
                            ? "données"
                            : "capteurs") ? (
                            <ChevronUp />
                          ) : (
                            <ChevronDown />
                          )}
                        </div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </div>

                {item.items?.length > 0 &&
                  (item.title === "Données" || item.title === "Capteurs") &&
                  activeSubMenu && (
                    <SidebarMenuSub
                      className={`ml-0 border-l-0 px-1.5 max-h-[200px] overflow-y-auto transition-all duration-300 ${
                        activeSubMenu ===
                        (item.title === "Données" ? "données" : "capteurs")
                          ? "block"
                          : "hidden"
                      }`}
                    >
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem
                          key={subItem.title}
                          className="border-l-2 ml-5"
                        >
                          <SidebarMenuSubButton
                            asChild
                            className={`${
                              pathname === subItem.url
                                ? "bg-primary text-white"
                                : ""
                            }`}
                          >
                            <Link href={subItem.url}>
                              {subItem.title}{" "}
                              {subItem.title === "Capteur l1" && <Unplug />}
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
