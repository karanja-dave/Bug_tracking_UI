import { NavLink } from "react-router";
import logo from '../../assets/images/logo-img.png'
export const Navbar = () => {
  return (
    <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* logo  */}
        <NavLink to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={logo}
              alt="Our logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xl font-bold text-gray-900">Hive</span>
        </NavLink>

        {/* nav links */}
        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-8">
            <li><NavLink to="/about" className="text-gray-600 hover:text-gray-900 font-medium">About</NavLink></li>
            <li><NavLink to="/features" className="text-gray-600 hover:text-gray-900 font-medium">Features</NavLink></li>
            <li><NavLink to="/pricing" className="text-gray-600 hover:text-gray-900 font-medium">Pricing</NavLink></li>
            <li><NavLink to="/contact" className="text-gray-600 hover:text-gray-900 font-medium">Contact Us</NavLink></li>
          </ul>
        </nav>

        {/* Auth buttons */}
        <div className="flex items-center space-x-3">
          <NavLink
            to="/login"
            className="hidden sm:block text-sm text-gray-700 hover:text-gray-900 font-medium"
          >
            Sign in
          </NavLink>

          <NavLink
            to="/register"
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
          >
            Get started
          </NavLink>
        </div>

      </div>
    </div>
  );
};
