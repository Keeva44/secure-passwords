import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import SafeIcon from '../common/SafeIcon';

const { FaSyncAlt, FaCopy, FaShieldAlt, FaSpinner, FaCheckCircle, FaExclamationTriangle, FaExclamationCircle, FaInfoCircle } = FaIcons;

function PasswordGenerator({ settings, setSettings, showToast }) {
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [strength, setStrength] = useState({ score: 0, label: '-', class: '' });
  const [breachStatus, setBreachStatus] = useState({
    loading: false,
    checked: false,
    safe: false,
    message: 'Click the button to check if your password has been compromised'
  });

  const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
  };

  useEffect(() => {
    generatePassword();
  }, []);

  const handleSettingChange = (setting, value) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const generatePassword = () => {
    let charset = '';
    const { length, uppercase, lowercase, numbers, symbols } = settings;

    if (uppercase) charset += charSets.uppercase;
    if (lowercase) charset += charSets.lowercase;
    if (numbers) charset += charSets.numbers;
    if (symbols) charset += charSets.symbols;

    if (charset === '') {
      showToast('Please select at least one character type!', 'error');
      return;
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    // Ensure at least one character from each selected type
    if (uppercase && !/[A-Z]/.test(password)) {
      password = replaceRandomChar(password, charSets.uppercase);
    }
    if (lowercase && !/[a-z]/.test(password)) {
      password = replaceRandomChar(password, charSets.lowercase);
    }
    if (numbers && !/[0-9]/.test(password)) {
      password = replaceRandomChar(password, charSets.numbers);
    }
    if (symbols && !/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/.test(password)) {
      password = replaceRandomChar(password, charSets.symbols);
    }

    // Shuffle the password
    password = password.split('').sort(() => 0.5 - Math.random()).join('');

    setGeneratedPassword(password);
    updateStrengthMeter(password);
    setBreachStatus(prev => ({ ...prev, checked: false, message: 'Click the button to check if your password has been compromised' }));
  };

  const replaceRandomChar = (password, charset) => {
    const position = Math.floor(Math.random() * password.length);
    const newChar = charset.charAt(Math.floor(Math.random() * charset.length));
    return password.substring(0, position) + newChar + password.substring(position + 1);
  };

  const updateStrengthMeter = (password) => {
    let score = 0;

    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (password.length >= 16) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;

    let label, className;
    if (score < 4) {
      label = 'Weak';
      className = 'strength-weak';
    } else if (score < 7) {
      label = 'Medium';
      className = 'strength-medium';
    } else {
      label = 'Strong';
      className = 'strength-strong';
    }

    setStrength({ score, label, class: className });
  };

  const copyPassword = () => {
    if (generatedPassword) {
      navigator.clipboard.writeText(generatedPassword);
      showToast('Password copied to clipboard!');
    } else {
      showToast('Generate a password first!', 'error');
    }
  };

  const sha1 = async (message) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
  };

  const checkPasswordBreach = async () => {
    if (!generatedPassword) {
      showToast('Generate a password first!', 'error');
      return;
    }

    setBreachStatus(prev => ({ ...prev, loading: true, message: 'Checking password safety...' }));

    try {
      const hash = await sha1(generatedPassword);
      const prefix = hash.substring(0, 5);
      const suffix = hash.substring(5);

      const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
      const data = await response.text();
      
      const found = data.split('\n').some(line => line.startsWith(suffix));
      
      setBreachStatus({
        loading: false,
        checked: true,
        safe: !found,
        message: found 
          ? 'This password has been found in data breaches! Choose a different one.'
          : 'Good news! This password has not been found in any known data breaches.'
      });
    } catch (error) {
      console.error('Error checking password:', error);
      setBreachStatus({
        loading: false,
        checked: true,
        safe: false,
        message: 'Could not check password safety. Please try again later.'
      });
    }
  };

  const getBreachIcon = () => {
    if (breachStatus.loading) return FaSpinner;
    if (!breachStatus.checked) return FaInfoCircle;
    if (breachStatus.safe) return FaCheckCircle;
    return FaExclamationTriangle;
  };

  const getBreachIconClass = () => {
    if (breachStatus.loading) return 'text-blue-500 animate-spin';
    if (!breachStatus.checked) return 'text-blue-500';
    if (breachStatus.safe) return 'text-green-500';
    return 'text-red-500';
  };

  const getBreachTextClass = () => {
    if (!breachStatus.checked) return 'text-gray-700';
    if (breachStatus.safe) return 'text-green-600';
    return 'text-red-600';
  };

  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Password Generator</h2>
      
      {/* Password Options */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Password Options</h3>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Length: <span className="font-bold">{settings.length}</span>
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="4"
              max="32"
              value={settings.length}
              onChange={(e) => handleSettingChange('length', parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <input
              type="number"
              min="4"
              max="32"
              value={settings.length}
              onChange={(e) => handleSettingChange('length', parseInt(e.target.value))}
              className="w-20 px-3 py-2 border border-gray-300 rounded-md text-center"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { key: 'uppercase', label: 'Uppercase' },
            { key: 'lowercase', label: 'Lowercase' },
            { key: 'numbers', label: 'Numbers' },
            { key: 'symbols', label: 'Symbols' }
          ].map(option => (
            <label key={option.key} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition">
              <input
                type="checkbox"
                checked={settings[option.key]}
                onChange={(e) => handleSettingChange(option.key, e.target.checked)}
                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
        
        <button
          onClick={generatePassword}
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-300 flex items-center justify-center"
        >
          <SafeIcon icon={FaSyncAlt} className="mr-2" />
          Generate Password
        </button>
      </div>
      
      {/* Password Display & Strength */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Generated Password</h3>
        
        <div className="flex items-center mb-4">
          <input
            type="text"
            value={generatedPassword}
            readOnly
            className="flex-grow px-4 py-3 border border-gray-300 rounded-l-lg bg-gray-50 font-mono"
          />
          <button
            onClick={copyPassword}
            className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-r-lg transition duration-300"
          >
            <SafeIcon icon={FaCopy} />
          </button>
        </div>
        
        <div className="mb-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-gray-700">Password Strength:</span>
            <span className="font-medium">{strength.label}</span>
          </div>
          <div className="strength-bar">
            <div 
              className={`strength-meter ${strength.class}`}
              style={{ width: `${(strength.score / 8) * 100}%` }}
            />
          </div>
        </div>
      </div>
      
      {/* Breach Checker */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Password Safety Check</h3>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            onClick={checkPasswordBreach}
            disabled={breachStatus.loading}
            className="py-2 px-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-medium rounded-lg shadow-md transition duration-300 flex items-center"
          >
            <SafeIcon icon={FaShieldAlt} className="mr-2" />
            Check Password Safety
          </button>
          <div className={`flex items-center ${getBreachTextClass()}`}>
            <SafeIcon icon={getBreachIcon()} className={`mr-2 ${getBreachIconClass()}`} />
            <span>{breachStatus.message}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PasswordGenerator;