import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './Login';

// Suggestion list ke liye cities
const cities = ["Delhi", "Mumbai", "Bangalore", "Goa", "Kolkata", "Chennai", "Hyderabad", "Jaipur", "Lucknow"];

function SearchPage() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const searchFlights = async () => {
    if (!from || !to) {
      alert("Please enter both 'From' and 'To' cities.");
      return;
    }

    setLoading(true);
    try {
     const res = await axios.get(`https://skybooker-pro.onrender.com/api/flights`, {
  params: { origin: from.trim(), destination: to.trim() }
});

      setFlights(res.data);
      
      if (res.data.length === 0) {
        alert("Nahi mili! Try karein: Delhi to Mumbai ya Bangalore to Goa");
      }
    } catch (err) {
      console.error(err);
      alert("Backend se connection nahi ho pa raha. Check karein ki server.js chal raha hai.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-sm p-4 flex justify-between items-center sticky top-0 z-50 px-10">
        <div className="text-2xl font-black text-blue-600">SKYBOOKER ✈️</div>
        <button 
          onClick={() => window.location.href = '/'} 
          className="text-red-500 font-bold px-5 py-2 border border-red-100 rounded-full hover:bg-red-500 hover:text-white transition shadow-sm"
        >
          Logout
        </button>
      </nav>

      {/* Hero Section */}
      <div className="bg-blue-600 py-16 px-6 text-white text-center">
        <h2 className="text-4xl font-extrabold mb-4 uppercase tracking-tighter italic">Akriti's Flight Finder 💎</h2>
        <p className="text-blue-100 mb-8">Exclusive access to premium routes and best deals</p>
        
        <div className="bg-white p-6 rounded-3xl shadow-2xl max-w-5xl mx-auto flex flex-wrap gap-4 items-end justify-center">
          <div className="flex flex-col text-left">
            <label className="text-gray-400 text-xs font-bold mb-1 ml-1 text-black">FROM</label>
            <input 
              list="city-list"
              className="text-gray-800 border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 outline-none w-72 shadow-sm" 
              placeholder="e.g. Delhi" 
              value={from}
              onChange={(e) => setFrom(e.target.value)} 
            />
          </div>

          <div className="text-blue-200 text-2xl pb-4 hidden md:block">⇄</div>

          <div className="flex flex-col text-left">
            <label className="text-gray-400 text-xs font-bold mb-1 ml-1 text-black">TO</label>
            <input 
              list="city-list"
              className="text-gray-800 border-2 border-gray-100 p-4 rounded-2xl focus:border-blue-500 outline-none w-72 shadow-sm" 
              placeholder="e.g. Mumbai" 
              value={to}
              onChange={(e) => setTo(e.target.value)} 
            />
          </div>

          <datalist id="city-list">
            {cities.map(city => <option key={city} value={city} />)}
          </datalist>

          <button 
            onClick={searchFlights} 
            className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-4 rounded-2xl font-black text-lg transition-all shadow-lg active:scale-95"
          >
            {loading ? "SEARCHING..." : "SEARCH FLIGHTS"}
          </button>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-4xl mx-auto py-12 px-6">
        {flights.length > 0 ? (
          <div className="grid gap-6">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-2 text-center">Flights Found for Akriti</h3>
            {flights.map(f => (
              <div key={f.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-wrap justify-between items-center hover:shadow-xl transition transform hover:-translate-y-1">
                <div className="flex items-center gap-5 text-black text-left">
                  <div className="bg-blue-50 p-4 rounded-2xl text-2xl">✈️</div>
                  <div>
                    <h4 className="text-2xl font-bold">{f.airline}</h4>
                    <p className="text-gray-400 font-medium">{f.time} • Non-stop</p>
                    <p className="text-blue-500 text-xs font-bold mt-1 uppercase">{f.origin} to {f.destination}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-3xl font-black text-gray-900">₹{f.price}</p>
                    <p className="text-xs text-green-500 font-bold uppercase">Free Cancellation</p>
                  </div>
                  <button 
                    onClick={() => {setSelectedFlight(f); setShowModal(true)}} 
                    className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && <div className="text-center py-20 text-gray-400 text-xl font-medium italic">Type cities to start your journey, Akriti! ✨</div>
        )}
      </div>

      {/* AKRITI'S SPECIAL BOARDING PASS */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-[100]">
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl max-w-lg w-full transform transition-all border-4 border-blue-50">
            
            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 text-white text-center">
              <h3 className="text-sm font-bold tracking-[0.3em] uppercase opacity-90">Exclusive Journey</h3>
              <h2 className="text-2xl font-black italic">AKRITI'S SKY-PASS 💎</h2>
            </div>

            <div className="bg-blue-600 p-6 text-white flex justify-between items-center border-t border-blue-400">
              <div className="text-left">
                <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest text-white">Airline Partner</p>
                <h2 className="text-2xl font-black text-white">{selectedFlight?.airline}</h2>
              </div>
              <div className="text-right text-white">
                <p className="text-xl font-bold">VIP Economy</p>
                <p className="text-[10px] opacity-80 uppercase font-bold tracking-tighter">Status: Confirmed</p>
              </div>
            </div>

            <div className="p-8 relative bg-white">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                <h1 className="text-9xl font-black rotate-12">AKRITI</h1>
              </div>

              <div className="flex justify-between items-center mb-8 relative z-10">
                <div className="text-left">
                  <h1 className="text-5xl font-black text-blue-700 uppercase">{selectedFlight?.origin.substring(0,3)}</h1>
                  <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{selectedFlight?.origin}</p>
                </div>
                <div className="flex-1 border-b-4 border-dotted border-blue-200 mx-4 relative">
                   <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-3 text-2xl animate-pulse">✈️</span>
                </div>
                <div className="text-right">
                  <h1 className="text-5xl font-black text-blue-700 uppercase">{selectedFlight?.destination.substring(0,3)}</h1>
                  <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{selectedFlight?.destination}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-8 text-left border-t-2 border-gray-50 pt-8 relative z-10">
                <div>
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Passenger Name</p>
                  <p className="font-black text-xl text-gray-800">Akriti Trivedi</p>
                </div>
                <div>
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Travel Date</p>
                  <p className="font-bold text-gray-800">15 March 2026</p>
                </div>
                <div>
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Gate / Seat</p>
                  <p className="font-bold text-gray-800 text-lg">Gate G-22 / <span className="text-orange-500 font-black">Seat 12A</span></p>
                </div>
                <div>
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Unique PNR</p>
                  <p className="font-black text-blue-600 text-lg">AKR-{Math.floor(10000 + Math.random() * 90000)}</p>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t-2 border-gray-50">
                 <div className="h-16 bg-gray-50 rounded-xl flex items-center justify-center p-2 border border-gray-100 shadow-inner">
                    <div className="w-full h-full flex gap-[2px]">
                      {[...Array(60)].map((_, i) => (
                        <div key={i} className="bg-black flex-1 rounded-full" style={{ width: (Math.random() * 4 + 1) + 'px' }}></div>
                      ))}
                    </div>
                 </div>
                 <p className="text-[9px] text-gray-400 mt-3 font-mono tracking-[0.5em] text-center">AKRITI-TRIVEDI-OFFICIAL-SKYPASS</p>
              </div>
            </div>

            <button 
              onClick={() => setShowModal(false)} 
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white py-6 font-black text-xl transition-all shadow-2xl uppercase tracking-widest"
            >
              Download Akriti's Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;