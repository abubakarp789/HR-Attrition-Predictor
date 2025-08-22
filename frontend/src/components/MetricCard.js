import React from 'react';

// Modern icons for metrics
const UsersIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
  </svg>
);

const TrendingUpIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
  </svg>
);

const ChartBarSquareIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
  </svg>
);

const BuildingOfficeIcon = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15l-.75 18h-13.5L4.5 3ZM12.75 8.25h.008v.008h-.008V8.25Zm0 9.75h.008v.008h-.008V18ZM9.75 8.25h.008v.008H9.75V8.25Zm0 9.75h.008v.008H9.75V18Zm6-9.75h.008v.008h-.008V8.25Zm0 9.75h.008v.008h-.008V18Z" />
  </svg>
);

const getIconComponent = (iconType) => {
  switch(iconType) {
    case 'users': return UsersIcon;
    case 'trending': return TrendingUpIcon;
    case 'chart': return ChartBarSquareIcon;
    case 'building': return BuildingOfficeIcon;
    default: return ChartBarSquareIcon;
  }
};

const getGradientColors = (iconType) => {
  switch(iconType) {
    case 'users': return { bg: 'from-blue-500 to-blue-600', shadow: 'shadow-blue-500/25' };
    case 'trending': return { bg: 'from-green-500 to-green-600', shadow: 'shadow-green-500/25' };
    case 'chart': return { bg: 'from-purple-500 to-purple-600', shadow: 'shadow-purple-500/25' };
    case 'building': return { bg: 'from-indigo-500 to-indigo-600', shadow: 'shadow-indigo-500/25' };
    default: return { bg: 'from-gray-500 to-gray-600', shadow: 'shadow-gray-500/25' };
  }
};

const MetricCard = ({ title, value, iconType = 'chart', className = '', trend = null }) => {
  const IconComponent = getIconComponent(iconType);
  const { bg, shadow } = getGradientColors(iconType);
  
  return (
    <div className={`metric-card group relative overflow-hidden ${className}`}>
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-current to-transparent rounded-full transform translate-x-6 -translate-y-6"></div>
      </div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-500 mb-2">{title}</p>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-gray-900">{value}</p>
              {trend && (
                <div className={`flex items-center text-sm font-medium ${
                  trend.type === 'up' ? 'text-green-600' : 
                  trend.type === 'down' ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {trend.type === 'up' && (
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                    </svg>
                  )}
                  {trend.type === 'down' && (
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.511-5.511-3.182" />
                    </svg>
                  )}
                  <span>{trend.value}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Icon */}
          <div className={`flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-r ${bg} ${shadow} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl`}>
            <IconComponent className="w-7 h-7 text-white" />
          </div>
        </div>
        
        {/* Progress bar or additional info */}
        <div className="mt-4">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${bg} transition-all duration-1000 ease-out`}
              style={{ 
                width: typeof value === 'string' && value.includes('%') 
                  ? value 
                  : '75%' 
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
