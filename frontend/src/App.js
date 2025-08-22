import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import EDA from './pages/EDA';
import SupervisedLearning from './pages/SupervisedLearning';
import UnsupervisedLearning from './pages/UnsupervisedLearning';
import About from './pages/About';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen relative overflow-hidden">
        {/* Background Elements */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full filter blur-3xl animate-pulse-custom"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full filter blur-3xl animate-pulse-custom" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-400/10 to-blue-400/10 rounded-full filter blur-3xl animate-pulse-custom" style={{animationDelay: '2s'}}></div>
        </div>
        
        <Sidebar />
        
        <main className="flex-1 ml-72 relative">
          <div className="min-h-screen p-8">
            {/* Header Bar */}
            <div className="mb-8">
              <div className="glassmorphism p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold gradient-text">
                      HR Analytics Dashboard
                    </h1>
                    <p className="text-gray-600 mt-1">
                      Advanced Machine Learning for Workforce Intelligence
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse-custom"></div>
                      <span className="text-sm text-gray-600">Live Data</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="animate-fade-in-up">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/eda" element={<EDA />} />
                <Route path="/supervised-learning" element={<SupervisedLearning />} />
                <Route path="/unsupervised-learning" element={<UnsupervisedLearning />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </div>
            
            {/* Modern Footer */}
            <footer className="mt-16 mb-8">
              <div className="glassmorphism p-6">
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center">
                      <span className="text-white text-sm font-bold">AB</span>
                    </div>
                    <span className="font-semibold text-gray-800">Abu Bakar</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Developed as part of the GDGoC FAST Peshawar ML Fellowship
                  </p>
                  <div className="flex items-center justify-center space-x-6 mt-4 text-xs text-gray-500">
                    <span>• Machine Learning</span>
                    <span>• Data Analytics</span>
                    <span>• React.js</span>
                    <span>• Python</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
