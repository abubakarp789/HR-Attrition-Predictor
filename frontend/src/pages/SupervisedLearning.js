import React, { useState, useEffect } from 'react';
import apiService from '../services/api';
import MetricCard from '../components/MetricCard';
import DataTable from '../components/DataTable';
import FileUpload from '../components/FileUpload';

const SupervisedLearning = () => {
  const [metrics, setMetrics] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [predicting, setPredicting] = useState(false);
  const [error, setError] = useState(null);
  const [uploadOption, setUploadOption] = useState('sample');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await apiService.getModelMetrics();
        setMetrics(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load model metrics');
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const handleSamplePrediction = async () => {
    setPredicting(true);
    setPredictions(null);
    setError(null);

    try {
      const response = await apiService.predictSample();
      setPredictions(response.data);
    } catch (err) {
      setError('Failed to generate sample predictions');
    } finally {
      setPredicting(false);
    }
  };

  const handleFileUpload = async (file) => {
    setPredicting(true);
    setPredictions(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('use_sample', 'false');

      const response = await apiService.predictTurnover(formData);
      setPredictions(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to process uploaded file');
    } finally {
      setPredicting(false);
    }
  };

  const downloadResults = () => {
    if (!predictions?.predictions) return;

    const csvContent = convertToCSV(predictions.predictions);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'turnover_predictions.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const convertToCSV = (data) => {
    if (!data || data.length === 0) return '';
    
    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(',')];
    
    data.forEach(row => {
      const values = headers.map(header => {
        const value = row[header];
        return typeof value === 'string' ? `"${value}"` : value;
      });
      csvRows.push(values.join(','));
    });
    
    return csvRows.join('\n');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin"></div>
          <div className="absolute inset-2 bg-white rounded-full"></div>
          <div className="absolute inset-3 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse-custom"></div>
        </div>
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Model Performance</h3>
          <p className="text-gray-600 animate-shimmer">Fetching ML metrics and analysis...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      {/* Hero Section */}
      <div className="glassmorphism p-6 mb-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400/10 to-blue-400/10 rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full filter blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-16.5 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                Supervised Learning
              </h1>
              <p className="text-lg text-gray-600">
                Advanced Turnover Prediction & Model Intelligence
              </p>
            </div>
          </div>
          
          <div className="bg-white/30 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-gray-700 leading-relaxed mb-3">
              Harness the power of advanced machine learning to predict employee turnover with exceptional accuracy. 
              Our Decision Tree classifier, optimized through GridSearchCV, provides actionable insights for proactive 
              talent retention strategies.
            </p>
            
            <div className="flex flex-wrap gap-2 text-sm">
              <div className="flex items-center space-x-2 px-2 py-1 bg-white/50 rounded-lg">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse-custom"></div>
                <span className="text-gray-700">Decision Tree ML</span>
              </div>
              <div className="flex items-center space-x-2 px-2 py-1 bg-white/50 rounded-lg">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse-custom" style={{animationDelay: '0.5s'}}></div>
                <span className="text-gray-700">Predictive Analytics</span>
              </div>
              <div className="flex items-center space-x-2 px-2 py-1 bg-white/50 rounded-lg">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse-custom" style={{animationDelay: '1s'}}></div>
                <span className="text-gray-700">Real-time Scoring</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Model Performance Metrics */}
      {metrics && (
        <section>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Model Performance Metrics</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <MetricCard
              title="Accuracy"
              value={(metrics.metrics.accuracy * 100).toFixed(2) + '%'}
              iconType="chart"
            />
            <MetricCard
              title="Precision"
              value={(metrics.metrics.precision * 100).toFixed(2) + '%'}
              iconType="trending"
            />
            <MetricCard
              title="Recall"
              value={(metrics.metrics.recall * 100).toFixed(2) + '%'}
              iconType="users"
            />
            <MetricCard
              title="F1 Score"
              value={(metrics.metrics.f1_score * 100).toFixed(2) + '%'}
              iconType="building"
            />
          </div>
        </section>
      )}

      {/* Model Evaluation Visualizations */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Model Evaluation & Visualizations</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="glassmorphism p-6 card-hover">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5m18 1.5a1.125 1.125 0 001.125-1.125M20.625 19.5v-1.5m0 0V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5m0 0c0-.621-.504-1.125-1.125-1.125M20.625 5.625v.75m0-.75c0-.621-.504-1.125-1.125-1.125m1.125 1.125c0 .621.504 1.125 1.125 1.125m-1.125 0h.75m-9 3.75h6.75a1.125 1.125 0 011.125 1.125v3a1.125 1.125 0 01-1.125 1.125H12a1.125 1.125 0 01-1.125-1.125v-3zM12 7.875v3.75m0-3.75a1.125 1.125 0 011.125-1.125M12 7.875V6.75a1.125 1.125 0 011.125-1.125m-2.25 0h.375a1.125 1.125 0 011.125 1.125v1.125M12 7.875A1.125 1.125 0 0110.875 9v3.75m0 0A1.125 1.125 0 0012 14.625v-3.75" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Confusion Matrix</h3>
            </div>
            <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
              <img 
                src={apiService.getImageUrl('confusion_matrix.png')} 
                alt="Confusion Matrix"
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div style={{display: 'none'}} className="flex items-center justify-center h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500 font-medium">Image not available</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glassmorphism p-6 card-hover">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.306a11.95 11.95 0 015.814-5.518l2.74-1.22" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">ROC Curve</h3>
            </div>
            <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
              <img 
                src={apiService.getImageUrl('roc_curve.png')} 
                alt="ROC Curve"
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div style={{display: 'none'}} className="flex items-center justify-center h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300">
                <div className="text-center">
                  <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500 font-medium">Image not available</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Importance */}
        <div className="glassmorphism p-6 card-hover">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Feature Importance Analysis</h3>
          </div>
          <div className="bg-white/50 rounded-xl p-3 backdrop-blur-sm">
            <img 
              src={apiService.getImageUrl('feature_importance.png')} 
              alt="Feature Importance"
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{display: 'none'}} className="flex items-center justify-center h-48 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center">
                <svg className="mx-auto h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="mt-2 text-sm text-gray-500 font-medium">Image not available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prediction Section */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Real-time Turnover Prediction</h2>
        </div>
        
        <div className="glassmorphism p-6 mb-4">
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-5 h-5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <label className="font-semibold text-gray-800">Choose Prediction Method</label>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <label className={`flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                uploadOption === 'file' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 bg-white/50 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  value="file"
                  checked={uploadOption === 'file'}
                  onChange={(e) => setUploadOption(e.target.value)}
                  className="text-purple-600 focus:ring-purple-500 mr-3"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Upload CSV File</div>
                    <div className="text-sm text-gray-600">Predict for your own data</div>
                  </div>
                </div>
              </label>
              
              <label className={`flex items-center p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                uploadOption === 'sample' 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-200 bg-white/50 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  value="sample"
                  checked={uploadOption === 'sample'}
                  onChange={(e) => setUploadOption(e.target.value)}
                  className="text-purple-600 focus:ring-purple-500 mr-3"
                />
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Use Sample Data</div>
                    <div className="text-sm text-gray-600">Quick demonstration</div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {uploadOption === 'file' ? (
            <FileUpload
              onFileUpload={handleFileUpload}
              loading={predicting}
              accept=".csv"
            />
          ) : (
            <div className="text-center">
              <div className="bg-white/60 border border-blue-200 rounded-2xl p-6 mb-6 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-blue-800">Sample Data Mode</h3>
                </div>
                <p className="text-blue-700">Using pre-loaded demonstration dataset for instant predictions</p>
              </div>
              
              <button
                onClick={handleSamplePrediction}
                disabled={predicting}
                className="btn-primary flex items-center mx-auto text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {predicting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    <span>Generating Predictions...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    </svg>
                    <span>Generate Predictions</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="glassmorphism p-4 mb-4 border-l-4 border-red-500">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-red-800">Prediction Error</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}        {/* Prediction Results */}
        {predictions && (
          <div className="space-y-6">
            <div className="glassmorphism p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Prediction Results Summary</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <MetricCard
                  title="Total Employees"
                  value={predictions.summary.total_employees}
                  iconType="users"
                />
                <MetricCard
                  title="Predicted to Leave"
                  value={predictions.summary.predicted_to_leave}
                  iconType="trending"
                />
                <MetricCard
                  title="Predicted Turnover Rate"
                  value={`${predictions.summary.turnover_rate}%`}
                  iconType="chart"
                />
              </div>
              
              <div className="bg-white/60 rounded-xl p-4 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5m18 1.5a1.125 1.125 0 001.125-1.125M20.625 19.5v-1.5m0 0V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5m0 0c0-.621-.504-1.125-1.125-1.125M20.625 5.625v.75m0-.75c0-.621-.504-1.125-1.125-1.125m1.125 1.125c0 .621.504 1.125 1.125 1.125m-1.125 0h.75m-9 3.75h6.75a1.125 1.125 0 011.125 1.125v3a1.125 1.125 0 01-1.125 1.125H12a1.125 1.125 0 01-1.125-1.125v-3zM12 7.875v3.75m0-3.75a1.125 1.125 0 011.125-1.125M12 7.875V6.75a1.125 1.125 0 011.125-1.125m-2.25 0h.375a1.125 1.125 0 011.125 1.125v1.125M12 7.875A1.125 1.125 0 0110.875 9v3.75m0 0A1.125 1.125 0 0012 14.625v-3.75" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Detailed Employee Predictions</h4>
                  </div>
                  <button
                    onClick={downloadResults}
                    className="btn-secondary flex items-center text-sm px-3 py-2"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Download Results
                  </button>
                </div>
                
                <DataTable data={predictions.predictions} maxRows={10} />
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default SupervisedLearning;
