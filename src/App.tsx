import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import GiftList from './pages/GiftList';
import GiftDetails from './pages/GiftDetails';
import RSVP from './pages/RSVP';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import GiftManagement from './pages/GiftManagement';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-olive-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gifts" element={<GiftList />} />
          <Route path="/gifts/:id" element={<GiftDetails />} />
          <Route path="/gift-management" element={<GiftManagement />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/admin" element={<Admin />} />
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600">Página não encontrada</p>
              </div>
            }
          />
        </Routes>
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    </Router>
  );
}

export default App;
