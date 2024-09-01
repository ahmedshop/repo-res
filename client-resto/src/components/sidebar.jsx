import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} w-64 z-10 lg:z-0 lg:translate-x-0 lg:w-64`}
    >
      
      <button
        onClick={toggleSidebar}
        className="p-4 text-xl bg-gray-700 hover:bg-gray-600 absolute top-0 right-0 lg:hidden"
      >
        <i className="fas fa-times"></i>
      </button>

      <nav className="flex flex-col justify-between h-full">
        <div className="mt-16">
          <Link to="/home" className="flex items-center p-4 hover:bg-gray-700" onClick={toggleSidebar}>
            <i className="fas fa-home mr-3"></i>
            Home
          </Link>
          <Link to="/charts" className="flex items-center p-4 hover:bg-gray-700" onClick={toggleSidebar}>
            <i className="fas fa-chart-bar mr-3"></i>
            Charts
          </Link>
          <Link to="/settings" className="flex items-center p-4 hover:bg-gray-700" onClick={toggleSidebar}>
            <i className="fas fa-cog mr-3"></i>
            Settings
          </Link>
        </div>
        <div className="flex items-center mb-4 p-4 space-x-4">
          <i className="fas fa-user-circle text-white ml-4" style={{ fontSize: '24px' }}></i>
          <span className="text-white">Welcome, User</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
