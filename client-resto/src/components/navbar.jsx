import React from 'react';

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <nav className="bg-gray-800 p-4 flex justify-between items-center z-20">
      <div className="flex items-center">
        <span className="text-white text-xl font-semibold ml-2">
          Dashboard
        </span>
      </div>
      <button
        onClick={toggleSidebar}
        className="text-white lg:hidden right-5"
      >
        <i
          className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}
          style={{ fontSize: '24px' }}
        ></i>
      </button>
    </nav>
  );
};

export default Navbar;
