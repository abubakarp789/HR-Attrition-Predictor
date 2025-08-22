import React from 'react';
import apiService from '../services/api';

const EDA = () => {
  const plotImages = [
    {
      title: "Turnover Distribution",
      filename: "attrition_distribution_pie.png",
      description: "Distribution of employees who left vs stayed"
    },
    {
      title: "Job Satisfaction vs Turnover",
      filename: "job_satisfaction_vs_attrition.png",
      description: "Relationship between satisfaction levels and employee turnover"
    },
    {
      title: "Correlation Heatmap",
      filename: "correlation_heatmap.png",
      description: "Correlation matrix showing relationships between features"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      {/* Header */}
      <div className="glassmorphism p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              Exploratory Data Analysis
            </h1>
            <p className="text-lg text-gray-600">
              Discover patterns and insights through advanced data visualization
            </p>
          </div>
        </div>
        
        <div className="bg-white/30 rounded-xl p-4 backdrop-blur-sm">
          <p className="text-gray-700 leading-relaxed mb-3">
            Dive deep into workforce analytics with interactive visualizations that reveal 
            hidden patterns in employee behavior, satisfaction levels, and turnover factors. 
            Our comprehensive analysis provides actionable insights for strategic HR decisions.
          </p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-custom"></div>
              <span>Real-time Analytics</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse-custom" style={{animationDelay: '0.5s'}}></div>
              <span>Interactive Visualizations</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-custom" style={{animationDelay: '1s'}}></div>
              <span>Statistical Insights</span>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Data Visualizations</h2>
        </div>
        
        <div className="grid gap-5">
          {plotImages.map((plot, index) => {
            const gradients = [
              'from-purple-500 to-pink-500',
              'from-blue-500 to-cyan-500',
              'from-green-500 to-emerald-500'
            ];
            
            return (
              <div key={index} className="glassmorphism p-5 card-hover">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${gradients[index % gradients.length]} flex items-center justify-center shadow-lg`}>
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{plot.title}</h3>
                    <p className="text-gray-600 text-sm">{plot.description}</p>
                  </div>
                </div>
                
                <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
                  <div className="flex justify-center">
                    <img
                      src={apiService.getImageUrl(plot.filename)}
                      alt={plot.title}
                      className="max-w-full h-auto rounded-lg shadow-lg"
                      style={{maxHeight: '400px'}}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div
                      style={{ display: 'none' }}
                      className="flex items-center justify-center h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300"
                    >
                      <div className="text-center">
                        <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-500 font-medium">Image not available</p>
                        <p className="text-xs text-gray-400">{plot.filename}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Key Insights */}
      <section className="glassmorphism p-5">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Key Insights & Discoveries</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-sm">Satisfaction Impact</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Lower job satisfaction directly correlates with higher employee turnover rates across all departments.
            </p>
          </div>
          
          <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-sm">Work-Life Balance</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Overtime and work-life balance issues are significant predictors of employee departure decisions.
            </p>
          </div>
          
          <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-sm">Performance Patterns</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Project load and performance evaluation scores show interesting patterns with retention rates.
            </p>
          </div>
        </div>
      </section>

      {/* Analysis Summary */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Statistical Analysis Summary</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-5">
          <div className="glassmorphism p-5 card-hover">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Distribution Analysis</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">Significant imbalance in turnover rates across departments</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">Higher attrition in specific organizational units</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">Strong correlation between salary levels and retention</p>
              </div>
            </div>
          </div>

          <div className="glassmorphism p-5 card-hover">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Correlation Insights</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">Robust correlation between job satisfaction and turnover</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">Project workload significantly affects retention decisions</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-rose-500 rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">Workplace incidents show minimal impact on turnover</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EDA;
