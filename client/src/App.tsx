// App.tsx - Updated for Web Development Agency with All Services
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Import pages
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import HowItWorksPage from './pages/HowItWorksPage';
import CartPage from './pages/CartPage';
import OrderConfirmation from './pages/OrderConfirmation';
import { AuthForm } from './pages/auth/AuthForm';

// Import all services
import WebDevelopmentServices from './services/webservice';
import SEOServices from './services/SEOServices';
import WebApplications from './services/WebApplications';
import DomainHosting from './services/DomainHosting';
import PlatformDevelopment from './services/PlatformDevelopment';
import EcommerceSolutions from './services/EcommerceSolutions';

function AppContent() {
  const handleGetStarted = () => {
    window.location.href = '/auth';
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage onGetStarted={handleGetStarted} />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          
          {/* Main Services Routes */}
          <Route path="/services" element={<WebDevelopmentServices />} />
          <Route path="/services/web-development" element={<WebDevelopmentServices />} />
          <Route path="/services/seo" element={<SEOServices />} />
          <Route path="/services/web-applications" element={<WebApplications />} />
          <Route path="/services/domain-hosting" element={<DomainHosting />} />
          <Route path="/services/platform" element={<PlatformDevelopment />} />
          <Route path="/services/ecommerce" element={<EcommerceSolutions />} />
          
          {/* Additional service aliases */}
          <Route path="/services/frontend" element={<WebDevelopmentServices />} />
          <Route path="/services/backend" element={<WebDevelopmentServices />} />
          <Route path="/services/fullstack" element={<WebDevelopmentServices />} />
          <Route path="/services/hosting" element={<DomainHosting />} />
          <Route path="/services/domains" element={<DomainHosting />} />
          <Route path="/services/marketplace" element={<PlatformDevelopment />} />
          <Route path="/services/online-store" element={<EcommerceSolutions />} />
          <Route path="/services/shopping" element={<EcommerceSolutions />} />
          
          {/* Legacy routes for backwards compatibility */}
          <Route path="/services/Instagram" element={<WebDevelopmentServices />} />
          <Route path="/services/TikTok" element={<WebDevelopmentServices />} />
          <Route path="/services/YouTube" element={<WebDevelopmentServices />} />
          
          {/* Auth routes */}
          <Route path="/auth" element={
            <AuthForm 
              isLogin={true} 
              onToggle={() => {}} 
              onSuccess={() => window.location.href = '/dashboard'} 
            />
          } />
          <Route path="/register" element={
            <AuthForm 
              isLogin={false} 
              onToggle={() => {}} 
              onSuccess={() => window.location.href = '/dashboard'} 
            />
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;