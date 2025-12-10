import { useState } from "react";
import { useSelector } from "react-redux";
import { Bell, Menu, Search } from "react-feather";
import type { RootState } from "../../app/store";

type AdminNavbarProps = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

export const AdminNavbar = ({ searchQuery, setSearchQuery }: AdminNavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Get the current user from Redux
  const currentUser = useSelector((state: RootState) => state.user.user);

  // Optional chaining to avoid crashes if user is undefined
  const name = currentUser?.FN || "User";
  const role = currentUser?.role_user || "admin";
  const avatar = name.charAt(0).toUpperCase();

  return (
    <nav className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-50">
      <div className="flex items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-4 md:gap-8">
          <button
            className="p-2 md:hidden hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900">ProjectHub</h1>
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects, tasks, bugs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-96 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{name}</p>
              <p className="text-xs text-gray-500 capitalize">{role}</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {avatar}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile search */}
      {menuOpen && (
        <div className="md:hidden mt-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects, tasks, bugs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}
    </nav>
  );
};
