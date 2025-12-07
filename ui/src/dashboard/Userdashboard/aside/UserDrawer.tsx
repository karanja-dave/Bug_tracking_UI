import { Link, useLocation } from "react-router";
import { userDrawerData } from "./drawerData";

export const UserDrawer = () => {
  const location = useLocation();

  return (
    // <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <nav className="space-y-2">

        {userDrawerData.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.includes(item.link);

          return (
            <Link
              key={item.id}
              to={item.link}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${isActive 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              <Icon size={20} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}

      </nav>
    // </aside>
  );
};
