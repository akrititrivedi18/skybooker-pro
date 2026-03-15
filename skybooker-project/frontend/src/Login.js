import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'akriti@skybooker.com' && password === 'akriti123') {
      navigate('/search');
    } else {
      alert('Galat credentials! Hint: akriti@skybooker.com / akriti123');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center animate-gradient px-4 relative overflow-hidden">
      
      {/* ✈️ YE RAHA BACKGROUND ME UDTA HUA PLANE */}
      <div className="plane-bg text-white opacity-20" style={{ top: '20%' }}>
        ✈️
      </div>

      {/* Login Card */}
      <div className="bg-white/90 backdrop-blur-lg p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md animate-float relative z-10 border border-white/20">
        
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">💎</div>
          <h1 className="text-4xl font-black text-blue-600 tracking-tighter">SKYBOOKER</h1>
          <p className="text-gray-500 font-bold text-xs uppercase tracking-widest mt-2">Premium Member Login</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-medium"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl outline-none font-medium"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-2xl font-black text-lg shadow-lg transition-all active:scale-95"
          >
            TAKE OFF 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
