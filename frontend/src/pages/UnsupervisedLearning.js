import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import DataTable from '../components/DataTable';

const UnsupervisedLearning = () => {
  const [clusterProfiles, setClusterProfiles] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClusterData = async () => {
      try {
        const response = await apiService.getClusterProfiles();
        setClusterProfiles(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load cluster profiles');
        setLoading(false);
      }
    };

    fetchClusterData();
  }, []);

  const clusterImages = [
    {
      title: "Optimal Number of Clusters",
      filename: "kmeans_elbow.png",
      description: "Elbow method to determine the optimal number of clusters"
    },
    {
      title: "Cluster Visualization",
      filename: "kmeans_clusters.png",
      description: "2D visualization of clusters using PCA dimensionality reduction"
    },
    {
      title: "Cluster Sizes",
      filename: "cluster_sizes.png",
      description: "Size of each cluster in the dataset"
    },
    {
      title: "Turnover Rates by Cluster",
      filename: "cluster_turnover_rates.png",
      description: "Turnover rates for each cluster"
    },
    {
      title: "Cluster Profiles",
      filename: "cluster_profiles.png",
      description: "Key characteristics of each cluster"
    }
  ];

  const getClusterDescription = (clusterData) => {
    const description = [];
    
    // Satisfaction Level
    if (clusterData['Mean_satisfaction_level']) {
      const satisfaction = clusterData['Mean_satisfaction_level'];
      if (satisfaction < 0.4) {
        description.push('low satisfaction level');
      } else if (satisfaction < 0.7) {
        description.push('moderate satisfaction level');
      } else {
        description.push('high satisfaction level');
      }
    }

    // Turnover Rate
    if (clusterData['Turnover_Rate']) {
      const turnover = clusterData['Turnover_Rate'];
      if (turnover > 25) {
        description.push('**high turnover risk**');
      } else if (turnover > 15) {
        description.push('moderate turnover risk');
      } else {
        description.push('low turnover risk');
      }
    }

    // Projects
    if (clusterData['Mean_number_project']) {
      const projects = clusterData['Mean_number_project'];
      if (projects < 2) {
        description.push('few projects');
      } else if (projects < 4) {
        description.push('moderate project load');
      } else {
        description.push('heavy project load');
      }
    }

    return description.join(' with ');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 animate-spin"></div>
          <div className="absolute inset-2 bg-white rounded-full"></div>
          <div className="absolute inset-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-pulse-custom"></div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Cluster Analysis</h3>
          <p className="text-gray-600">Preparing K-means clustering insights...</p>
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
      {/* Hero Section */}
      <div className="glassmorphism p-6 mb-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full filter blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                Unsupervised Learning
              </h1>
              <p className="text-lg text-gray-600">Employee Segmentation & Pattern Discovery</p>
            </div>
          </div>
          
          <div className="bg-white/30 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-gray-700 mb-3 leading-relaxed">
              Discover hidden patterns in workforce behavior through K-means clustering analysis. 
              This approach reveals natural employee groupings for strategic HR insights.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-custom"></div>
                <span>K-Means Clustering</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse-custom" style={{animationDelay: '0.5s'}}></div>
                <span>PCA Visualization</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-custom" style={{animationDelay: '1s'}}></div>
                <span>Pattern Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clustering Visualizations */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Clustering Analysis Visualizations</h2>
        </div>
        
        <div className="grid gap-5">
          {clusterImages.map((image, index) => {
            const gradients = [
              'from-purple-500 to-indigo-500',
              'from-blue-500 to-cyan-500',
              'from-green-500 to-emerald-500',
              'from-pink-500 to-rose-500',
              'from-orange-500 to-red-500'
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
                    <h3 className="text-lg font-bold text-gray-900">{image.title}</h3>
                    <p className="text-gray-600 text-sm">{image.description}</p>
                  </div>
                </div>
                
                <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
                  <div className="flex justify-center">
                    <img
                      src={apiService.getImageUrl(image.filename)}
                      alt={image.title}
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
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-500 font-medium">Image not available</p>
                        <p className="text-xs text-gray-400">{image.filename}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Cluster Data Table */}
      {clusterProfiles && (
        <section>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5m18 1.5a1.125 1.125 0 001.125-1.125M20.625 19.5v-1.5m0 0V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5m0 0c0-.621-.504-1.125-1.125-1.125M20.625 5.625v.75m0-.75c0-.621-.504-1.125-1.125-1.125m1.125 1.125c0 .621.504 1.125 1.125 1.125m-1.125 0h.75m-9 3.75h6.75a1.125 1.125 0 011.125 1.125v3a1.125 1.125 0 01-1.125 1.125H12a1.125 1.125 0 01-1.125-1.125v-3zM12 7.875v3.75m0-3.75a1.125 1.125 0 011.125-1.125M12 7.875V6.75a1.125 1.125 0 011.125-1.125m-2.25 0h.375a1.125 1.125 0 011.125 1.125v1.125M12 7.875A1.125 1.125 0 0110.875 9v3.75m0 0A1.125 1.125 0 0012 14.625v-3.75" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Detailed Cluster Characteristics</h2>
          </div>
          
          <div className="glassmorphism p-4">
            <DataTable data={clusterProfiles} />
          </div>
        </section>
      )}

      {/* Cluster Interpretation */}
      {clusterProfiles && (
        <section>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Cluster Interpretation & Insights</h2>
          </div>
          
          <div className="space-y-4">
            {clusterProfiles.map((cluster, index) => {
              const clusterGradients = [
                'from-blue-500 to-blue-600',
                'from-purple-500 to-purple-600',
                'from-green-500 to-green-600',
                'from-pink-500 to-pink-600'
              ];
              
              return (
                <div key={index} className="glassmorphism p-4 card-hover">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${clusterGradients[index % clusterGradients.length]} flex items-center justify-center shadow-lg`}>
                        <span className="text-white font-bold">{cluster.Cluster}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Cluster {cluster.Cluster}
                        </h3>
                        <p className="text-gray-600 text-xs">
                          <span className="font-semibold">{cluster.Size}</span> employees ({cluster.Percentage?.toFixed(1)}%)
                        </p>
                      </div>
                    </div>
                    
                    <div className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      cluster.Turnover_Rate > 25
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white'
                        : cluster.Turnover_Rate > 15
                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-white'
                        : 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                    }`}>
                      {cluster.Turnover_Rate?.toFixed(1)}% Risk
                    </div>
                  </div>

                  <div className="bg-white/50 rounded-lg p-3 backdrop-blur-sm mb-3">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      Employees with <strong>{getClusterDescription(cluster)}</strong>
                    </p>
                  </div>

                  {/* Compact Metrics Grid */}
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { key: 'Mean_satisfaction_level', label: 'Satisfaction', format: (val) => val?.toFixed(2) },
                      { key: 'Mean_number_project', label: 'Projects', format: (val) => val?.toFixed(1) },
                      { key: 'Mean_average_montly_hours', label: 'Hours', format: (val) => val?.toFixed(0) },
                      { key: 'Mean_time_spend_company', label: 'Years', format: (val) => val?.toFixed(1) }
                    ].map((metric, metricIndex) => {
                      const value = cluster[metric.key];
                      if (!value) return null;
                      
                      return (
                        <div key={metricIndex} className="bg-white/60 rounded-lg p-2 text-center backdrop-blur-sm">
                          <div className="text-sm font-bold text-gray-900 mb-1">
                            {metric.format(value)}
                          </div>
                          <div className="text-xs text-gray-600 font-medium">
                            {metric.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Key Insights Summary */}
      <section className="glassmorphism p-5">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Strategic Clustering Insights</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-sm">Workforce Segmentation</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Distinct employee segments identified through unsupervised learning, revealing natural groupings based on behavior patterns.
            </p>
          </div>
          
          <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1-3h9l-1 3M12 10.5h.01M12 7.5h.01M12 4.5h.01" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-sm">Behavioral Patterns</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Similar behavior patterns across clusters indicate a relatively homogeneous workforce with subtle but important differences.
            </p>
          </div>
          
          <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-800 text-sm">Retention Strategy</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              Differences in turnover rates suggest targeted retention strategies could be highly effective for specific employee segments.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default UnsupervisedLearning;
