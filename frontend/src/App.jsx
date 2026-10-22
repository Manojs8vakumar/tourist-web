import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MessageSquare, Phone, Sparkles, Bot } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import SearchModal from './components/SearchModal';
import DirectContactModal from './components/DirectContactModal';
import AIChatbotModal from './components/AIChatbotModal';

// Pages
import Home from './pages/Home';
import IndiaDestinations from './pages/IndiaDestinations';
import DestinationDetail from './pages/DestinationDetail';
import PackageListing from './pages/PackageListing';
import PackageDetail from './pages/PackageDetail';
import AccommodationsPage from './pages/AccommodationsPage';
import JournalPage from './pages/JournalPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [enquiryDestination, setEnquiryDestination] = useState('Namakkal, Tamil Nadu');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactDirectOpen, setIsContactDirectOpen] = useState(false);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleOpenEnquiry = (dest = 'Namakkal, Tamil Nadu') => {
    setEnquiryDestination(dest);
    setIsEnquiryOpen(true);
  };

  return (
    <BrowserRouter>
      <div className="app-root">
        {/* Navigation Bar */}
        <Navbar
          onOpenEnquiry={() => handleOpenEnquiry('General Journey')}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenContactDirect={() => setIsContactDirectOpen(true)}
        />

        {/* Global Modal Windows */}
        <EnquiryModal
          isOpen={isEnquiryOpen}
          onClose={() => setIsEnquiryOpen(false)}
          initialDestination={enquiryDestination}
        />

        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        <DirectContactModal
          isOpen={isContactDirectOpen}
          onClose={() => setIsContactDirectOpen(false)}
        />

        {/* Floating AI Concierge & Curator Contact Pills */}
        <div className="floating-actions-cluster">
          <button
            onClick={() => setIsChatbotOpen(true)}
            className="floating-ai-btn"
            title="Ask Google Gemini AI Travel Concierge"
          >
            <Bot size={18} />
            <span className="btn-label">Ask Gemini AI</span>
          </button>

          <button
            onClick={() => setIsContactDirectOpen(true)}
            className="floating-contact-btn"
            title="Contact Curator Manoj Sivakumar (+91 93446 83958)"
          >
            <span className="floating-pulse" />
            <MessageSquare size={18} />
            <span className="btn-label">Contact (+91 93446 83958)</span>
          </button>
        </div>

        {/* Global Conversational AI Chatbot Modal */}
        <AIChatbotModal
          isOpen={isChatbotOpen}
          onClose={() => setIsChatbotOpen(false)}
          initialDestination="Rajasthan"
        />

        {/* Routing Area */}
        <Routes>
          <Route
            path="/"
            element={
              <Home
                onOpenEnquiry={handleOpenEnquiry}
                onOpenContactDirect={() => setIsContactDirectOpen(true)}
              />
            }
          />
          <Route
            path="/destinations/india"
            element={
              <IndiaDestinations
                onOpenEnquiry={handleOpenEnquiry}
                onOpenContactDirect={() => setIsContactDirectOpen(true)}
              />
            }
          />
          <Route path="/destinations/:slug" element={<DestinationDetail onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/packages" element={<PackageListing />} />
          <Route path="/packages/:slug" element={<PackageDetail onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/accommodations" element={<AccommodationsPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/about" element={<AboutPage onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/contact" element={<ContactPage onOpenContactDirect={() => setIsContactDirectOpen(true)} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<CustomerDashboard onOpenEnquiry={handleOpenEnquiry} />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route
            path="*"
            element={
              <Home
                onOpenEnquiry={handleOpenEnquiry}
                onOpenContactDirect={() => setIsContactDirectOpen(true)}
              />
            }
          />
        </Routes>

        {/* Footer */}
        <Footer onOpenContactDirect={() => setIsContactDirectOpen(true)} />

        <style>{`
          .floating-actions-cluster {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            z-index: 1500;
            display: flex;
            align-items: center;
            gap: 0.85rem;
          }
          .floating-ai-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.55rem;
            background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
            color: #ffffff;
            border: 1px solid rgba(56, 189, 248, 0.45);
            padding: 0.85rem 1.35rem;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 700;
            box-shadow: 0 10px 30px rgba(2, 132, 199, 0.45);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .floating-ai-btn:hover {
            transform: translateY(-3px) scale(1.03);
            background: linear-gradient(135deg, #0369a1 0%, #075985 100%);
            box-shadow: 0 14px 40px rgba(2, 132, 199, 0.55);
          }
          .floating-contact-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.65rem;
            background: linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%);
            color: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.35);
            padding: 0.85rem 1.45rem;
            border-radius: 50px;
            font-size: 0.85rem;
            font-weight: 700;
            box-shadow: 0 10px 30px rgba(37, 99, 235, 0.45);
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
          }
          .floating-contact-btn:hover {
            transform: translateY(-3px) scale(1.03);
            background: linear-gradient(135deg, #1e40af 0%, #1d4ed8 100%);
            box-shadow: 0 14px 40px rgba(37, 99, 235, 0.55);
          }
          .floating-pulse {
            width: 9px;
            height: 9px;
            border-radius: 50%;
            background: #22c55e;
            box-shadow: 0 0 10px #22c55e;
          }
          @media (max-width: 640px) {
            .floating-actions-cluster {
              bottom: 1.25rem;
              right: 1.25rem;
              gap: 0.5rem;
            }
            .floating-ai-btn .btn-label,
            .floating-contact-btn .btn-label {
              display: none;
            }
            .floating-ai-btn,
            .floating-contact-btn {
              padding: 0.85rem;
              border-radius: 50%;
            }
          }
        `}</style>
      </div>
    </BrowserRouter>
  );
}
