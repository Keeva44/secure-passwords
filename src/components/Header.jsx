import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import SafeIcon from '../common/SafeIcon';

const { FaShieldAlt, FaBars } = FaIcons;

function Header({ activeSection, setActiveSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="header bg-white rounded-lg shadow-md p-4 mb-6 sticky top-0 z-10 relative">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-blue-600 text-white p-2 rounded-lg mr-3">
            <SafeIcon icon={FaShieldAlt} className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Secure Password Generator</h1>
            <p className="text-gray-600 text-sm">Create strong passwords and check their safety</p>
          </div>
        </div>
        
        <nav className="hidden md:flex space-x-6">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-link text-gray-700 hover:text-blue-600 font-medium transition ${
                activeSection === item.id ? 'active' : ''
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-600 focus:outline-none"
        >
          <SafeIcon icon={FaBars} className="text-xl" />
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg z-50 md:hidden">
          <div className="p-4 space-y-3">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium transition"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;