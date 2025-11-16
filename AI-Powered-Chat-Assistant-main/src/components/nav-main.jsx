"use client"

import { useLocation, Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function NavMain({ items }) {
  const location = useLocation();
  const [openKeys, setOpenKeys] = useState([]);

  // On route change, auto open the matching section and close others
  useEffect(() => {
    const matchedKey = items.find((item) =>
      item.items?.some((sub) => location.pathname.startsWith(sub.url))
    )?.title;

    if (matchedKey) {
      setOpenKeys([matchedKey]);
    } else {
      setOpenKeys([]); // No match, collapse all
    }
  }, [location.pathname, items]);

  // Toggle collapsibles manually
  const toggle = (key) => {
    if (openKeys.includes(key)) {
      setOpenKeys(openKeys.filter((k) => k !== key));
    } else {
      setOpenKeys([...openKeys, key]);
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>AdminModules</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            open={openKeys.includes(item.title)}
            onOpenChange={() => toggle(item.title)}
            asChild
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                  <ChevronRight
                    className={`ml-auto transition-transform duration-200 ${
                      openKeys.includes(item.title) ? "rotate-90" : ""
                    }`}
                  />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild>
                        <Link
  to={subItem.url}
  className={`flex items-center w-full px-2 py-1.5 rounded-md transition-colors ${
    location.pathname === subItem.url
      ? "font-bold"
      : ""
  }`}
>
  <span>{subItem.title}</span>
</Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
