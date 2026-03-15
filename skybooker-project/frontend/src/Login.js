import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // No validation - Direct entry
    navigate('/search');
  };

  return (
    // Background with a soft blue-to-indigo gradient
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-700 px-4">
      
      {/* Main Glass Card */}
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/20">
        
        {/* Logo/Icon Section */}
        <div className="text-center mb-8">
          <div className="bg-white/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/30">
            <span className="text-4xl">✈️</span>
          </div>
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase">SkyBooker</h2>
          <p className="text-blue-100 text-sm font-medium mt-1">Akriti's Travel Portal</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email/Username Input */}
          <div className="relative">
            <input 
              type="text" 
              className="w-full bg-white/10 border border-white/20 p-4 rounded-2xl outline-none text-white placeholder-blue-200 focus:bg-white/20 focus:border-white/50 transition-all" 
              placeholder="Username or Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          {/* Password Input */}
          <div className="relative">
            <input 
              type="password" 
              className="w-full bg-white/10 border border-white/20 p-4 rounded-2xl outline-none text-white placeholder-blue-200 focus:bg-white/20 focus:border-white/50 transition-all" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login Button with Shine Effect */}
          <button 
            type="submit" 
            className="w-full bg-white text-blue-600 p-4 rounded-2xl font-black text-lg hover:bg-blue-50 transition-all shadow-xl active:scale-95 uppercase tracking-widest mt-4"
          >
            Get Started
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-blue-100 text-xs font-bold uppercase tracking-widest opacity-60">
            Unlimited Access • No Password Required
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
