import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Modern SVG Icons
const HomeIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
  </svg>
);

const ChartBarIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
  </svg>
);

const CpuChipIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-16.5 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
  </svg>
);

const MagnifyingGlassIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

const InformationCircleIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
  </svg>
);

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { 
      name: 'Home', 
      href: '/', 
      icon: HomeIcon,
      gradient: 'from-blue-400 to-blue-600'
    },
    { 
      name: 'Exploratory Data Analysis', 
      href: '/eda', 
      icon: ChartBarIcon,
      gradient: 'from-green-400 to-green-600'
    },
    { 
      name: 'Supervised Learning', 
      href: '/supervised-learning', 
      icon: CpuChipIcon,
      gradient: 'from-purple-400 to-purple-600'
    },
    { 
      name: 'Unsupervised Learning', 
      href: '/unsupervised-learning', 
      icon: MagnifyingGlassIcon,
      gradient: 'from-pink-400 to-pink-600'
    },
    { 
      name: 'About', 
      href: '/about', 
      icon: InformationCircleIcon,
      gradient: 'from-indigo-400 to-indigo-600'
    }
  ];

  return (
    <div className="fixed inset-y-0 left-0 w-72 glassmorphism m-4 rounded-3xl z-50">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-8 border-b border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                HR Analytics
              </h1>
              <p className="text-sm text-gray-600">ML Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 py-8 space-y-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            const IconComponent = item.icon;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  sidebar-item group relative overflow-hidden
                  ${isActive ? 'sidebar-item-active' : 'sidebar-item-inactive'}
                `}
              >
                {/* Gradient background for active item */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r opacity-100" 
                       style={{background: `linear-gradient(135deg, var(--primary-500) 0%, var(--secondary-500) 100%)`}}>
                  </div>
                )}
                
                {/* Icon */}
                <div className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-xl mr-4 transition-all duration-300 ${
                  isActive 
                    ? 'bg-white/20 shadow-lg' 
                    : `bg-gradient-to-r ${item.gradient} group-hover:shadow-lg`
                }`}>
                  <IconComponent className={`w-5 h-5 ${
                    isActive ? 'text-white' : 'text-white'
                  }`} />
                </div>
                
                {/* Text */}
                <span className={`relative z-10 font-medium transition-colors ${
                  isActive ? 'text-white' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  {item.name}
                </span>
                
                {/* Hover effect */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-xl"></div>
                )}
              </Link>
            );
          })}
        </nav>
        
        {/* Bottom Section */}
        <div className="p-6 border-t border-white/20">
          <div className="text-center">
            <div className="text-xs text-gray-500 mb-2">
              Version 1.0
            </div>
            <div className="flex items-center justify-center space-x-1 text-xs text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-custom"></div>
              <span>System Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
