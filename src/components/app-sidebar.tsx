import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  ListChecks,
  Sparkles,
  MessageSquare,
  BarChart3,
  UsersRound,
  Settings,
  LifeBuoy,
  ClipboardList,
  ShieldCheck,
} from "lucide-react";

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
  useSidebar,
} from "@/components/ui/sidebar";

const main = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Clients", url: "/clients", icon: Users },
  { title: "Onboarding", url: "/onboarding", icon: UserPlus },
  { title: "Documents", url: "/documents", icon: FileText },
  { title: "Tasks", url: "/tasks", icon: ListChecks },
] as const;

const intelligence = [
  { title: "AI Workspace", url: "/ai-workspace", icon: Sparkles },
  { title: "AI Review Queue", url: "/ai-review", icon: ShieldCheck },
  { title: "Communications", url: "/communications", icon: MessageSquare },
] as const;

const org = [
  { title: "Reports", url: "/reports", icon: BarChart3 },
  { title: "Industry Insights", url: "/insights", icon: ClipboardList },
  { title: "Team", url: "/team", icon: UsersRound },
  { title: "Settings", url: "/settings", icon: Settings },
] as const;

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });

  const isActive = (url: string) =>
    url === "/" ? pathname === "/" : pathname.startsWith(url);

  const renderGroup = (
    label: string,
    items: ReadonlyArray<{ title: string; url: string; icon: React.ElementType }>,
  ) => (
    <SidebarGroup>
      {!collapsed && (
        <SidebarGroupLabel className="text-[0.68rem] uppercase tracking-[0.14em] text-white/60 font-bold px-3 py-1.5">
          {label}
        </SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {items.map((item) => {
            const active = isActive(item.url);
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                  <Link
                    to={item.url}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${active
                      ? "bg-[#3cadf1] text-white font-bold"
                      : "text-white/80 hover:text-white hover:bg-white/10 font-medium"
                      }`}
                  >
                    <item.icon className="h-4 w-4 shrink-0 text-white" />
                    {!collapsed && <span className="truncate">{item.title}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-[#3d3949] bg-[linear-gradient(180deg,#2c2a35_0%,#1e1c26_60%,#14121a_100%)] text-white shadow-2xl"
    >
      <SidebarHeader className="px-3 py-4">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          {collapsed ? (
            <div className="">
              <img src="/favicon.png" alt="LexaRox" className="h-6 w-6" />
            </div>
          ) : (
            <div className="w-full">
              <img src="/logo.png" alt="LexaRox Accounts" className="h-8 w-auto object-contain object-left" />
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="gap-1 px-1">
        {renderGroup("Operations", main)}
        {renderGroup("Intelligence", intelligence)}
        {renderGroup("Organisation", org)}
      </SidebarContent>

      <SidebarFooter className={`gap-1 border-t border-[#3d3949] ${collapsed ? "p-1" : "p-2"}`}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Help & Support">
              <Link
                to="/settings"
                className="flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all font-medium"
              >
                <LifeBuoy className="h-4 w-4 shrink-0 text-white" />
                {!collapsed && <span className="text-sm">Help &amp; Support</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Andrea Whitfield">
              <Link
                to="/settings"
                className={`flex h-auto items-center transition-all text-white ${collapsed
                    ? "p-0 border-0 bg-transparent hover:bg-transparent justify-center"
                    : "gap-3 p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10"
                  }`}
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#3cadf1] text-white font-bold text-xs">
                  AW
                </span>
                {!collapsed && (
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-sm font-bold text-white">Andrea Whitfield</span>
                    <span className="truncate text-xs text-white/70 font-medium">Admin · Account settings</span>
                  </span>
                )}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
