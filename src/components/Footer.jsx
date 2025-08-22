import React from 'react';
import * as FaIcons from 'react-icons/fa';
import SafeIcon from '../common/SafeIcon';

const { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } = FaIcons;

function Footer({ setActiveSection, showModal }) {
  const quickLinks = [
    { label: 'Generator', section: 'home', target: null },
    { label: 'Features', section: 'home', target: 'features' },
    { label: 'How to Use', section: 'home', target: 'how-to-use' },
    { label: 'FAQs', section: 'home', target: 'faqs' },
    { label: 'About', section: 'about' },
    { label: 'Contact', section: 'contact' }
  ];

  const socialLinks = [
    { 
      icon: FaFacebookF, 
      color: 'hover:text-blue-600',
      url: 'https://facebook.com/securepasswordgenerator',
      label: 'Facebook'
    },
    { 
      icon: FaTwitter, 
      color: 'hover:text-blue-400',
      url: 'https://twitter.com/securepassgen',
      label: 'Twitter'
    },
    { 
      icon: FaInstagram, 
      color: 'hover:text-pink-600',
      url: 'https://instagram.com/securepasswordgen',
      label: 'Instagram'
    },
    { 
      icon: FaLinkedinIn, 
      color: 'hover:text-blue-700',
      url: 'https://linkedin.com/company/secure-password-generator',
      label: 'LinkedIn'
    }
  ];

  const handleLinkClick = (section, target) => {
    setActiveSection(section);
    
    if (target) {
      // Wait for section to render, then scroll to target
      setTimeout(() => {
        const targetElement = document.getElementById(target);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Just scroll to top for sections without specific targets
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSocialClick = (url, label) => {
    // In a real app, these would be actual social media links
    // For demo purposes, we'll show a placeholder message
    alert(`This would redirect to: ${url}\n\nConnect with us on ${label}!`);
  };

  const handlePrivacyClick = () => {
    showModal('privacy', 'Privacy Policy', getPrivacyContent());
  };

  const handleTermsClick = () => {
    showModal('terms', 'Terms of Service', getTermsContent());
  };

  const getPrivacyContent = () => (
    <div className="prose max-w-none">
      <h3 className="text-xl font-semibold mt-4 mb-2">Information We Collect</h3>
      <p>Our Password Generator & Checker does not collect any personal information. All password generation and checking happens locally in your browser. We do not store, transmit, or save any passwords you generate.</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Password Safety Check</h3>
      <p>When you use the "Check Password Safety" feature, we send a secure, anonymized hash of your password to the Have I Been Pwned API. This service uses k-anonymity to ensure your actual password is never transmitted or stored.</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Local Storage</h3>
      <p>We use your browser's local storage to save your password format preferences. This data is stored locally on your device and is not transmitted to our servers or any third parties.</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Cookies</h3>
      <p>We do not use cookies or any tracking technologies on our website.</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Third-Party Services</h3>
      <p>We use the Have I Been Pwned API for password breach checking. Please review their privacy policy for more information about how they handle data.</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Children's Privacy</h3>
      <p>Our service is not directed to children under 13. We do not knowingly collect personal information from children under 13.</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Changes to This Policy</h3>
      <p>We may update this privacy policy from time to time. Changes will be posted on this page.</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Contact Us</h3>
      <p>If you have any questions about this privacy policy, please contact us at privacy@securepasswordgenerator.com</p>
    </div>
  );

  const getTermsContent = () => (
    <div className="prose max-w-none">
      <h3 className="text-xl font-semibold mt-4 mb-2">Acceptance of Terms</h3>
      <p>By using the Secure Password Generator service, you agree to be bound by these Terms of Service.</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Description of Service</h3>
      <p>Our service provides tools to generate secure passwords and check if they have been compromised in data breaches. All password generation happens locally in your browser.</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">User Responsibilities</h3>
      <p>You are responsible for maintaining the security of your generated passwords. We are not responsible for any loss or damage resulting from the use of passwords generated by our service.</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Prohibited Uses</h3>
      <p>You may not use our service for any illegal purposes or to generate passwords for accounts you do not have permission to access.</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Disclaimer of Warranties</h3>
      <p>Our service is provided "as is" without any warranties, express or implied. We do not guarantee that the service will be uninterrupted or error-free.</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Limitation of Liability</h3>
      <p>We shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service.</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Changes to Terms</h3>
      <p>We reserve the right to modify these terms at any time. Changes will be posted on this page.</p>
      
      <h3 className="text-xl font-semibold mt-4 mb-2">Contact</h3>
      <p>If you have any questions about these terms, please contact us at terms@securepasswordgenerator.com</p>
    </div>
  );

  return (
    <footer className="footer bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="mb-4 md:mb-0">
          <p className="font-semibold text-gray-800">www.securepasswordgenerator.com</p>
          <p className="text-gray-600 text-sm">© 2025 Secure Password Generator. All rights reserved.</p>
        </div>
        <div className="flex space-x-4">
          {socialLinks.map((social, index) => (
            <button
              key={index}
              onClick={() => handleSocialClick(social.url, social.label)}
              className={`text-gray-600 ${social.color} transition hover:scale-110`}
              title={`Follow us on ${social.label}`}
            >
              <SafeIcon icon={social.icon} className="text-xl" />
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between items-center pt-4 border-t border-gray-200">
        <div className="mb-4 md:mb-0">
          <h3 className="font-semibold text-gray-800 mb-2">Quick Links</h3>
          <div className="flex flex-wrap gap-3">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleLinkClick(link.section, link.target)}
                className="text-gray-600 hover:text-blue-600 transition"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex space-x-4">
            <button
              onClick={handlePrivacyClick}
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Privacy Policy
            </button>
            <button
              onClick={handleTermsClick}
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;