"use client"

import * as React from "react"
import { useSelector, useDispatch } from "react-redux";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Airplay
} from "lucide-react"

import {
  createNewChat,
  deleteSession,
  renameSession,
  exportSession,
  setActiveSession
} from "@/store/chatSlice";

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Kevin",
    email: "Kevin@chat-assistant.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    { name: "Chat Assistant AI", logo: Airplay, plan: "Enterprise" }
  ],
  navMain: [
    {
      title: "Voice Journal",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [{ title: "Record Journal", url: "/" }],
    },
    {
      title: "Get All Voice Journal",
      url: "#",
      icon: Bot,
      items: [{ title: "My Voice Library", url: "/all-notes" }],
    }
  ],
};

export function AppSidebar(props) {
  const dispatch = useDispatch();
  const { sessions, activeSessionId } = useSelector((state) => state.chat);
  const sortedSessions = [...sessions].sort((a, b) => {
  const aTime = a.updatedAt || a.messages?.at(-1)?.timestamp || 0;
  const bTime = b.updatedAt || b.messages?.at(-1)?.timestamp || 0;
  return new Date(bTime) - new Date(aTime);  // latest first
});

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}

        {/* ⭐ FIXED: all actions wrapped with dispatch */}
        <NavProjects
          sessions={sortedSessions}
          activeSessionId={activeSessionId}
          setActiveSessionId={(id) => dispatch(setActiveSession(id))}
          createNewChat={() => dispatch(createNewChat())}
          deleteSession={(id) => dispatch(deleteSession(id))}
          renameSession={(id, title) => dispatch(renameSession({ id, newTitle: title }))}
          exportSession={(id) => dispatch(exportSession(id))}
        />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
