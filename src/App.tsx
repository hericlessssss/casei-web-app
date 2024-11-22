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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-olive-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gifts" element={<GiftList />} />
          <Route path="/gifts/:id" element={<GiftDetails />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
        <Toaster position="bottom-center" />
      </div>
    </Router>
  );
}

export default App;