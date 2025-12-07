import {
  FolderKanban,
  CheckCircle2,
  Bug,
  Users,
  Settings,
  User
} from "lucide-react";

export const userDrawerData = [

  {
    id: "tasks",
    name: "My Tasks",
    icon: CheckCircle2,
    view: "tasks",
    link: "tasks"
  },
  {
    id: "projects",
    name: "My Projects",
    icon: FolderKanban,
    view: "projects",
    link: "projects"
  },
  {
    id: "bugs",
    name: "Bugs",
    icon: Bug,
    view: "bugs",
    link: "bugs"
  },
  {
    id: "team",
    name: "My Teams",
    icon: Users,
    view: "team",
    link: "team"
  },
  {
    id: "settings",
    name: "My Profile",
    icon: User,
    view: "settings",
    link: "settings"
  }
];
