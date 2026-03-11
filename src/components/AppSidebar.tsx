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
} from "./ui/sidebar";
import { 
  Home, 
  Users, 
  GraduationCap, 
  Calendar, 
  FileText, 
  BookOpen, 
  Settings, 
  BarChart3,
  School
} from "lucide-react";

interface AppSidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const menuItems = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: Home,
  },
  {
    title: "Students",
    url: "students",
    icon: Users,
  },
  {
    title: "Teachers",
    url: "teachers",
    icon: GraduationCap,
  },
  {
    title: "Attendance",
    url: "attendance",
    icon: Calendar,
  },
  {
    title: "Grades",
    url: "grades",
    icon: FileText,
  },
  {
    title: "Courses",
    url: "courses",
    icon: BookOpen,
  },
  {
    title: "Reports",
    url: "reports",
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: "settings",
    icon: Settings,
  },
];

export function AppSidebar({ currentView, onViewChange }: AppSidebarProps) {
  return (
    <Sidebar className="bg-black border-r border-gray-800">
      <SidebarHeader className="bg-black border-b border-gray-800">
        <div className="flex items-center space-x-2 px-4 py-2">
          <School className="h-6 w-6 text-white" />
          <span className="font-semibold text-white">SchoolMS</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-black">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-400">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => onViewChange(item.url)}
                    isActive={currentView === item.url}
                    className={`text-white hover:bg-gray-800 hover:text-white ${
                      currentView === item.url 
                        ? 'bg-gray-800 text-white' 
                        : 'text-gray-300'
                    }`}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-black border-t border-gray-800">
        <div className="px-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-white text-sm">
              A
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">Admin User</p>
              <p className="text-xs text-gray-400">admin@school.edu</p>
            </div>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}