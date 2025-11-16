import { NavLink } from "react-router";
import logo from '../../assets/images/logo-img.png'

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Logo */}
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

          {/* Footer Links */}
          <ul className="flex space-x-6 text-sm text-gray-600">
            <li><NavLink to="/about" className="hover:text-gray-900">About</NavLink></li>
            <li><NavLink to="/features" className="hover:text-gray-900">Features</NavLink></li>
            <li><NavLink to="/pricing" className="hover:text-gray-900">Pricing</NavLink></li>
            <li><NavLink to="/contact" className="hover:text-gray-900">Contact</NavLink></li>
          </ul>
        </div>

        {/* Copyright */}
        <div className="mt-4 text-center text-sm text-gray-500">
          © 2025 Hive. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
