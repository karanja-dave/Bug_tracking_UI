
import { Zap } from 'lucide-react';


export const Footer = () => {
  return (
    <div>
        {/* Simple Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-gray-900">Velocity</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <a href="#" className="hover:text-gray-900">Features</a>
              <a href="#" className="hover:text-gray-900">Pricing</a>
              <a href="#" className="hover:text-gray-900">About</a>
              <a href="#" className="hover:text-gray-900">Contact</a>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            © 2025 Velocity. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
