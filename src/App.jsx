import React, { useState } from 'react';
import Header from './components/Header';
import PasswordGenerator from './components/PasswordGenerator';
import SavedFormats from './components/SavedFormats';
import Features from './components/Features';
import HowToUse from './components/HowToUse';
import SecurityAdvice from './components/SecurityAdvice';
import DailyTip from './components/DailyTip';
import FAQs from './components/FAQs';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [modal, setModal] = useState({ show: false, type: '', title: '', content: '' });
  const [passwordSettings, setPasswordSettings] = useState({
    length: 12,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false
  });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  const showModal = (type, title, content) => {
    setModal({ show: true, type, title, content });
  };

  const closeModal = () => {
    setModal({ show: false, type: '', title: '', content: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="app-container max-w-4xl mx-auto px-4 py-6">
        <Header 
          activeSection={activeSection} 
          setActiveSection={setActiveSection}
        />

        {activeSection === 'home' && (
          <>
            <PasswordGenerator
              settings={passwordSettings}
              setSettings={setPasswordSettings}
              showToast={showToast}
            />
            <SavedFormats
              showToast={showToast}
              setSettings={setPasswordSettings}
              setActiveSection={setActiveSection}
            />
            <Features />
            <HowToUse />
            <SecurityAdvice />
            <DailyTip />
            <FAQs />
          </>
        )}

        {activeSection === 'about' && <About />}
        {activeSection === 'contact' && <Contact showToast={showToast} />}

        <Footer setActiveSection={setActiveSection} showModal={showModal} />
      </div>

      <Toast toast={toast} />
      <Modal modal={modal} closeModal={closeModal} />
    </div>
  );
}

export default App;