import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './dashboard/Home';
import Charts from './dashboard/Charts';
import Settings from './dashboard/Settings';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <main className="flex-1 bg-gray-100 p-4 lg:pl-64">
          <Routes>
            <Route path="/dashboard" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
