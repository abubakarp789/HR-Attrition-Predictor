import React from 'react';

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      {/* Hero Section */}
      <div className="glassmorphism p-6 mb-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full filter blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-br from-pink-400/10 to-red-400/10 rounded-full filter blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold gradient-text">
                About This Project
              </h1>
              <p className="text-lg text-gray-600">
                AI-Powered HR Analytics & Workforce Intelligence
              </p>
            </div>
          </div>
          
          <div className="bg-white/40 rounded-xl p-4 backdrop-blur-sm">
            <p className="text-gray-700 leading-relaxed mb-3">
              A comprehensive machine learning platform that transforms raw HR data into actionable workforce insights, 
              combining cutting-edge AI algorithms with intuitive visualization to predict employee turnover and 
              discover hidden patterns in organizational behavior.
            </p>
            
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-xs font-medium">
                Machine Learning
              </div>
              <div className="px-3 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg text-xs font-medium">
                Predictive Analytics
              </div>
              <div className="px-3 py-1 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg text-xs font-medium">
                Data Visualization
              </div>
              <div className="px-3 py-1 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg text-xs font-medium">
                HR Analytics
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ML Pipeline Overview */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">ML Pipeline Components</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Data Preprocessing",
              description: "Advanced data cleaning, feature engineering, and categorical encoding",
              gradient: "from-blue-500 to-blue-600",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>
              )
            },
            {
              title: "Visual Analytics",
              description: "Interactive charts revealing key relationships and patterns",
              gradient: "from-purple-500 to-purple-600",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              )
            },
            {
              title: "Predictive Models",
              description: "Decision Tree algorithms with hyperparameter optimization",
              gradient: "from-green-500 to-green-600",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                </svg>
              )
            },
            {
              title: "Pattern Discovery",
              description: "K-Means clustering for workforce segmentation insights",
              gradient: "from-pink-500 to-pink-600",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              )
            },
            {
              title: "Model Transparency",
              description: "Feature importance analysis and decision tree visualization",
              gradient: "from-indigo-500 to-indigo-600",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
                </svg>
              )
            },
            {
              title: "Interactive Platform",
              description: "Modern React interface with real-time prediction capabilities",
              gradient: "from-cyan-500 to-cyan-600",
              icon: (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
              )
            }
          ].map((component, index) => (
            <div key={index} className="glassmorphism p-4 card-hover">
              <div className="flex items-center space-x-2 mb-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${component.gradient} flex items-center justify-center shadow-lg`}>
                  <div className="text-white">{component.icon}</div>
                </div>
                <div className="text-sm font-bold text-gray-900">{index + 1}</div>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{component.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{component.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Technology Stack</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-5">
          <div className="glassmorphism p-5 card-hover">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3V6a3 3 0 013-3h13.5a3 3 0 013 3v5.25a3 3 0 01-3 3M5.25 14.25L12 7.5l6.75 6.75" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Backend Technologies</h3>
            </div>
            <div className="space-y-2">
              {[
                { name: "Flask", desc: "Lightweight Python web framework" },
                { name: "Pandas & NumPy", desc: "Data manipulation and analysis" },
                { name: "Scikit-learn", desc: "Machine learning library" },
                { name: "Matplotlib & Seaborn", desc: "Statistical visualization" },
                { name: "Joblib", desc: "Model serialization" }
              ].map((tech, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">{tech.name}:</span>
                    <span className="text-gray-600 ml-2">{tech.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glassmorphism p-5 card-hover">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Frontend Technologies</h3>
            </div>
            <div className="space-y-2">
              {[
                { name: "React 18", desc: "Modern UI development" },
                { name: "React Router", desc: "Client-side navigation" },
                { name: "Tailwind CSS", desc: "Utility-first styling" },
                { name: "Axios", desc: "HTTP API client" },
                { name: "JavaScript ES6+", desc: "Modern language features" }
              ].map((tech, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <span className="font-semibold text-gray-900">{tech.name}:</span>
                    <span className="text-gray-600 ml-2">{tech.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Dataset Information */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Dataset Overview</h2>
        </div>
        
        <div className="glassmorphism p-5">
          <p className="text-gray-700 leading-relaxed mb-4">
            The project leverages the comprehensive HR Analytics Employee Turnover dataset, 
            containing rich employee attributes including satisfaction metrics, performance evaluations, 
            project assignments, and organizational outcomes.
          </p>
          
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 text-sm">Dataset Statistics</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Total Records:</span>
                  <span className="font-semibold text-gray-900 text-sm">14,999</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Feature Variables:</span>
                  <span className="font-semibold text-gray-900 text-sm">10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Target Type:</span>
                  <span className="font-semibold text-gray-900 text-sm">Binary</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Data Types:</span>
                  <span className="font-semibold text-gray-900 text-sm">Mixed</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3-12h.75a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 18V6a2.25 2.25 0 012.25-2.25H9.75a2.25 2.25 0 012.25 2.25v.75l2.25-1.5" />
                  </svg>
                </div>
                <h4 className="font-bold text-gray-900 text-sm">Key Attributes</h4>
              </div>
              <div className="space-y-2">
                {[
                  "Employee satisfaction level",
                  "Performance evaluation scores",
                  "Project workload metrics",
                  "Monthly working hours",
                  "Department & salary data"
                ].map((attribute, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
                    <span className="text-gray-700 text-sm">{attribute}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="glassmorphism p-5">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Learning Outcomes & Skills</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Technical Skills</h3>
            </div>
            <div className="space-y-2">
              {[
                "End-to-end ML pipeline development",
                "Supervised & unsupervised learning",
                "Model evaluation and interpretation",
                "RESTful API development",
                "Modern web development with React"
              ].map((skill, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-1 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-1.036.84-1.875 1.875-1.875H8.25a2.25 2.25 0 012.25 2.25v.25a2.25 2.25 0 002.25 2.25h2.25A2.25 2.25 0 0117.25 12v5.25z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-sm">Domain Expertise</h3>
            </div>
            <div className="space-y-2">
              {[
                "HR analytics and workforce insights",
                "Employee turnover prediction",
                "Data-driven decision making",
                "Feature importance analysis",
                "Workforce segmentation techniques"
              ].map((skill, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full mt-1 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Enhancements */}
      <section>
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Future Enhancements</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-5">
          <div className="glassmorphism p-5 card-hover">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">ML Enhancements</h3>
            </div>
            <div className="space-y-2">
              {[
                "Advanced models (Random Forest, XGBoost)",
                "Automated feature engineering",
                "Model ensemble techniques",
                "AutoML integration"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glassmorphism p-5 card-hover">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Platform Features</h3>
            </div>
            <div className="space-y-2">
              {[
                "Real-time model monitoring",
                "Advanced interactive visualizations",
                "Cloud deployment architecture",
                "User authentication & roles"
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Developer Information */}
      <section className="glassmorphism p-5">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-900">Developer & Project Information</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-5">
          <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold">AB</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Abu Bakar</h3>
                <p className="text-xs text-gray-600">Machine Learning Developer</p>
              </div>
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <svg className="w-1 h-1 text-white" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                </div>
                <span className="text-gray-700">GDGoC FAST Peshawar Fellowship</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-1 h-1 text-white" fill="currentColor" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="3" />
                  </svg>
                </div>
                <span className="text-gray-700">AI/ML Specialization 2025</span>
              </div>
            </div>
          </div>

          <div className="bg-white/50 rounded-xl p-4 backdrop-blur-sm">
            <h3 className="font-bold text-gray-900 mb-3 text-sm">Connect & Collaborate</h3>
            <div className="space-y-2">
              <a
                href="https://github.com/abubakarp789"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">GitHub Profile</p>
                  <p className="text-xs text-gray-600">View source code & projects</p>
                </div>
              </a>
              
              <a
                href="https://linkedin.com/in/abubakar56"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-white/60 rounded-xl hover:bg-white/80 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">LinkedIn Profile</p>
                  <p className="text-xs text-gray-600">Professional networking</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
