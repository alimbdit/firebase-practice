import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
   
        return (
            <nav className="bg-blue-500 p-6 mb-5">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex-shrink-0">
                    <Link to="/" className="text-white font-bold">
                      My App
                    </Link>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center">
                      <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 hover:text-white">
                        Home
                      </Link>
                      <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 hover:text-white">
                        Register
                      </Link>
                      <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 hover:text-white">
                        Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          );
   
};

export default Header;