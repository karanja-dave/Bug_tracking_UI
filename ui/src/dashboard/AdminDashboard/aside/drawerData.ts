import {
  LayoutDashboard,
  FolderKanban,
  CheckCircle2,
  Bug,
  Users,
  Settings
} from "lucide-react";

export const adminDrawerData = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: LayoutDashboard,
    view: "dashboard",
    link: "dashboard"
  },
  {
    id: "projects",
    name: "Projects",
    icon: FolderKanban,
    view: "projects",
    link: "projects"
  },
  {
    id: "tasks",
    name: "Tasks",
    icon: CheckCircle2,
    view: "tasks",
    link: "tasks"
  },
  {
    id: "bugs",
    name: "Bug Tracking",
    icon: Bug,
    view: "bugs",
    link: "bugs"
  },
  {
    id: "team",
    name: "Team",
    icon: Users,
    view: "team",
    link: "team"
  },
  {
    id: "settings",
    name: "Settings",
    icon: Settings,
    view: "settings",
    link: "settings"
  }
];
