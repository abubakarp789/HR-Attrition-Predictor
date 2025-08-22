import React from 'react';

const DataTable = ({ data, maxRows = null, className = '' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="glassmorphism p-12 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">No Data Available</h3>
            <p className="text-gray-600">There's no data to display in the table.</p>
          </div>
        </div>
      </div>
    );
  }

  const displayData = maxRows ? data.slice(0, maxRows) : data;
  const columns = Object.keys(displayData[0]);

  return (
    <div className={`glassmorphism overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-white/30 backdrop-blur-sm">
              {columns.map((column, index) => {
                const gradients = [
                  'from-blue-500 to-blue-600',
                  'from-purple-500 to-purple-600', 
                  'from-green-500 to-green-600',
                  'from-pink-500 to-pink-600',
                  'from-indigo-500 to-indigo-600',
                  'from-cyan-500 to-cyan-600'
                ];
                
                return (
                  <th
                    key={column}
                    className="px-6 py-4 text-left border-b border-white/20"
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${gradients[index % gradients.length]} shadow-sm`}></div>
                      <span className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                        {column.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {displayData.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                className="border-b border-white/10 hover:bg-white/20 transition-all duration-200 group"
              >
                {columns.map((column, colIndex) => {
                  const value = row[column];
                  let displayValue = typeof value === 'number' 
                    ? value.toLocaleString() 
                    : value?.toString() || 'N/A';
                  
                  // Special formatting for specific columns
                  let cellClassName = "px-6 py-4 text-sm transition-all duration-200";
                  
                  // Color coding for prediction results
                  if (column.toLowerCase().includes('prediction') || column.toLowerCase().includes('left')) {
                    if (displayValue === '1' || displayValue === 'Yes' || displayValue === 'Left') {
                      cellClassName += " text-red-700 font-semibold";
                      displayValue = displayValue === '1' ? 'Will Leave' : displayValue;
                    } else if (displayValue === '0' || displayValue === 'No' || displayValue === 'Stayed') {
                      cellClassName += " text-green-700 font-semibold";
                      displayValue = displayValue === '0' ? 'Will Stay' : displayValue;
                    } else {
                      cellClassName += " text-gray-700 font-medium";
                    }
                  } else if (column.toLowerCase().includes('rate') || column.toLowerCase().includes('percentage')) {
                    cellClassName += " text-blue-700 font-semibold";
                  } else {
                    cellClassName += " text-gray-700 group-hover:text-gray-900";
                  }
                  
                  return (
                    <td key={column} className={cellClassName}>
                      {displayValue}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {maxRows && data.length > maxRows && (
        <div className="px-6 py-4 bg-white/20 border-t border-white/20 backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-3 text-sm text-gray-700">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <span className="font-medium">
              Showing <span className="font-bold text-blue-700">{maxRows}</span> of <span className="font-bold text-purple-700">{data.length}</span> rows
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
