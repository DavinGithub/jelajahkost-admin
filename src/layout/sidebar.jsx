import { LayoutDashboard, School } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { title: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
  ];

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-white border-r border-gray-200 flex flex-col overflow-y-auto">
      <div className="p-4">
        <h1 className="text-xl font-semibold text-blue-600">Jelajahkost admin</h1>
      </div>
      <nav className="flex-1 p-2">
        {menuItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg mb-1 ${
              location.pathname === item.path
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.icon}
            <span>{item.title}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;