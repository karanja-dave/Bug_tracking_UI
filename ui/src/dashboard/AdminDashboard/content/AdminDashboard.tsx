import { Outlet } from "react-router";
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { AdminDrawer } from "../aside/AdminDrawer";
import { AdminNavbar } from "../../../components/nav/AdminNavbar";

export const AdminDashboard = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // <-- add this

  // toggle drawer for mobile
  const handleDrawerToggle = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Pass the required props */}
      <AdminNavbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Top bar with toggle */}
      <div className="flex bg-white items-center">
        <button
          className="mr-4 text-white text-2xl lg:hidden"
          onClick={handleDrawerToggle}
        >
          {drawerOpen ? <IoCloseSharp /> : <FaBars />}
        </button>
      </div>

      <div className="flex bg-gray-100">
        {/* Drawer menu */}
        <aside
          className={`fixed z-40 w-64 bg-white ${
            drawerOpen ? "" : "hidden"
          } lg:static lg:block lg:w-64`}
          style={{
            minHeight: "calc(100vh - 64px)",
            top: "64px",
          }}
        >
          <div className="p-4">
            <button
              className="absolute top-4 right-4 text-white text-2xl lg:hidden"
              onClick={handleDrawerToggle}
            >
              <IoCloseSharp />
            </button>
            <AdminDrawer />
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 w-auto sm:w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
