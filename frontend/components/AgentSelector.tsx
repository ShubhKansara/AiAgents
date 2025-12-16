"use client";

import { useEffect, useState } from "react";
import { fetchAgents, Agent } from "@/lib/api";
import { useAppStore } from "@/lib/store";
import { Search, Bot, FileText, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AgentSelector() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { setSelectedAgent, selectedAgent } = useAppStore();

  useEffect(() => {
    fetchAgents().then(setAgents).catch(console.error);
  }, []);

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Sidebar
      className="border-r border-sidebar-border bg-sidebar"
      collapsible="icon"
    >
      <SidebarHeader className="bg-sidebar">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-sidebar-primary-foreground">
                <Bot className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">100 AI Agents</span>
                <span className="truncate text-xs text-muted-foreground">
                  Enterprise Edition
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="px-2 pt-2 group-data-[collapsible=icon]:hidden">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
            <Input
              placeholder="Find an agent..."
              className="pl-9 h-9 bg-background/50 border-sidebar-border focus:bg-background transition-colors"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {filteredAgents.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
            No agents found.
          </div>
        ) : (
          <SidebarGroup>
            <SidebarGroupLabel className="uppercase tracking-wider text-[10px] font-bold text-sidebar-foreground/50 mt-2">
              Available Agents
            </SidebarGroupLabel>
            <SidebarMenu>
              {filteredAgents.map((agent) => (
                <SidebarMenuItem key={agent.id}>
                  <SidebarMenuButton
                    isActive={selectedAgent?.id === agent.id}
                    onClick={() => setSelectedAgent(agent)}
                    tooltip={agent.name}
                    className="h-auto py-2.5"
                  >
                    {selectedAgent?.id === agent.id ? (
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                        <Bot className="size-3.5" />
                      </div>
                    ) : (
                      <FileText className="size-4 text-muted-foreground/70" />
                    )}
                    <div className="flex flex-col gap-0.5 text-left w-full overflow-hidden leading-none">
                      <span
                        className={
                          selectedAgent?.id === agent.id
                            ? "font-medium text-foreground"
                            : "text-muted-foreground group-hover:text-foreground transition-colors"
                        }
                      >
                        {agent.name}
                      </span>
                      <span className="truncate text-[10px] text-muted-foreground/60">
                        {agent.category}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-teal-500 text-white">
                <User className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">User Profile</span>
                <span className="truncate text-xs text-muted-foreground">
                  user@example.com
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
