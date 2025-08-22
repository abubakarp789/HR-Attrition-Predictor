import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import MetricCard from '../components/MetricCard';
import DataTable from '../components/DataTable';

const Home = () => {
  const [datasetOverview, setDatasetOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiService.getDatasetOverview();
        setDatasetOverview(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dataset overview');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-spin"></div>
          <div className="absolute inset-2 bg-white rounded-full"></div>
          <div className="absolute inset-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse-custom"></div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Dashboard</h3>
          <p className="text-gray-600">Preparing workforce analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      {/* Header */}
      <div className="glassmorphism p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-1.036.84-1.875 1.875-1.875H8.25a2.25 2.25 0 012.25 2.25v.25a2.25 2.25 0 002.25 2.25h2.25A2.25 2.25 0 0117.25 12v5.25z" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              Employee Turnover Prediction
            </h1>
            <p className="text-lg text-gray-600">Workforce Intelligence Platform</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-5 h-5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-gray-800">Project Objectives</h2>
        </div>
        
        <p className="text-gray-700 mb-4 leading-relaxed">
          This comprehensive machine learning platform delivers advanced workforce analytics 
          through cutting-edge AI algorithms and interactive data visualizations.
        </p>
        
        <div className="grid md:grid-cols-3 gap-3 mb-4">
          <div className="flex items-start space-x-2 p-3 bg-white/50 rounded-lg">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">Predict Turnover</h3>
              <p className="text-xs text-gray-600">Advanced Decision Tree algorithms for accurate predictions</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 p-3 bg-white/50 rounded-lg">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">Pattern Discovery</h3>
              <p className="text-xs text-gray-600">K-Means clustering for workforce insights</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 p-3 bg-white/50 rounded-lg">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1 text-sm">Visual Analytics</h3>
              <p className="text-xs text-gray-600">Interactive charts and data exploration</p>
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 text-xs">
          Navigate through the sidebar to explore different aspects of the analytics platform.
        </p>
      </div>

      {/* Dataset Overview */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Dataset Overview</h2>
        </div>
        
        {datasetOverview && (
          <>
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricCard
                title="Total Employees"
                value={datasetOverview.total_employees?.toLocaleString() || 'N/A'}
                iconType="users"
              />
              <MetricCard
                title="Turnover Rate"
                value={datasetOverview.turnover_rate ? `${datasetOverview.turnover_rate}%` : 'N/A'}
                iconType="trending"
              />
              <MetricCard
                title="Features"
                value={datasetOverview.total_features || 'N/A'}
                iconType="chart"
              />
              <MetricCard
                title="Departments"
                value={datasetOverview.departments || 'N/A'}
                iconType="building"
              />
            </div>

            {/* Sample Data */}
            <div className="mb-6 glassmorphism p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-5 h-5 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Sample Data Preview</h3>
              </div>
              <DataTable data={datasetOverview.sample_data} maxRows={5} />
            </div>

            {/* Column Information */}
            <div className="glassmorphism p-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-5 h-5 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3-12h.75a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V6a2.25 2.25 0 012.25-2.25H9.75a2.25 2.25 0 012.25 2.25v.75l2.25-1.5" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Dataset Schema</h3>
              </div>
              <DataTable data={datasetOverview.columns} />
            </div>
          </>
        )}
      </section>

      {/* Algorithms Used */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-16.5 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25Zm.75-12h9v9h-9v-9Z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Machine Learning Algorithms</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-5">
          <div className="glassmorphism p-5 card-hover">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Supervised Learning</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm"><strong>Decision Tree Classifier</strong> - Advanced tree-based learning</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">Hyperparameter optimization with GridSearchCV</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">Comprehensive evaluation metrics and validation</p>
              </div>
            </div>
          </div>

          <div className="glassmorphism p-5 card-hover">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Unsupervised Learning</h3>
            </div>
            <div className="space-y-2">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm"><strong>K-Means Clustering</strong> - Pattern discovery in data</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">Optimal cluster detection with Elbow method</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">PCA for dimensionality reduction and visualization</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
