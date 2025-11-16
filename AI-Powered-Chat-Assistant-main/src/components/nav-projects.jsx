"use client";
import{useState}from "react";
import { Folder, MoreHorizontal, Trash2, Pencil, Download  } from "lucide-react";
import { Input } from "@/components/ui/input";
import { formatRelativeTime } from "@/lib/relative-time";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; 

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavProjects({
  sessions,
  activeSessionId,
  setActiveSessionId,
  deleteSession,
  createNewChat,
  renameSession,
  exportSession, 
}) {
  const { isMobile } = useSidebar();
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const startEditing = (chat) => {
    setEditingId(chat.id);
    setEditingTitle(chat.title || "");
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const commitEditing = () => {
    const trimmed = editingTitle.trim();
    if (editingId && trimmed) {
      renameSession(editingId, trimmed);
    }
    cancelEditing();
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Chats</SidebarGroupLabel>

      <SidebarMenu>

        {/* NEW CHAT */}
        <SidebarMenuItem>
          <SidebarMenuButton onClick={createNewChat}>
            <Folder className="text-muted-foreground" />
            <span className="font-medium">+ New Chat</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {sessions?.map((chat) => (
          <SidebarMenuItem key={chat.id}>
            <SidebarMenuButton
              isActive={chat.id === activeSessionId}
              onClick={() => setActiveSessionId(chat.id)}
            >
              <Folder className="text-muted-foreground" />
              {editingId === chat.id ? (
                <Input
                  value={editingTitle}
                  autoFocus
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onBlur={commitEditing}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") commitEditing();
                    if (e.key === "Escape") cancelEditing();
                  }}
                  className="h-7 px-1 text-xs bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              ) : (
                <span
                  className="truncate text-xs"
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    startEditing(chat);
                  }}
                >
                  {chat.title} <span className="text-[8px] text-muted-foreground mt-0.5">
    {formatRelativeTime(chat.updatedAt)}
  </span>
                </span>
              )}
            </SidebarMenuButton>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                </SidebarMenuAction>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                {/* Rename */}
                <DropdownMenuItem onClick={() =>startEditing(chat)}>
                  <Pencil className="text-muted-foreground" />
                  <span>Rename Chat</span>
                </DropdownMenuItem>

                {/* Export */}
                <DropdownMenuItem onClick={() => exportSession(chat.id)}>
                  <Download className="text-muted-foreground" />
                  <span>Export Chat (JSON)</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                {/* Delete */}
                <DropdownMenuItem
                  onClick={() => deleteSession(chat.id)}
                  className="text-red-500"
                >
                  <Trash2 className="text-muted-foreground" />
                  <span>Delete Chat</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}