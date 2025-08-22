import React from 'react';
import * as FaIcons from 'react-icons/fa';
import SafeIcon from '../common/SafeIcon';

const { FaKey, FaLock, FaUserShield, FaSyncAlt, FaEyeSlash, FaLaptopCode } = FaIcons;

function SecurityAdvice() {
  const tips = [
    {
      icon: FaKey,
      title: 'Use Unique Passwords',
      description: 'Never reuse the same password across multiple accounts. If one account is compromised, all others become vulnerable.',
      gradient: 'from-blue-50 to-indigo-50',
      border: 'border-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: FaLock,
      title: 'Enable Two-Factor Authentication',
      description: 'Add an extra layer of security by enabling 2FA on all accounts that support it.',
      gradient: 'from-green-50 to-emerald-50',
      border: 'border-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: FaUserShield,
      title: 'Use a Password Manager',
      description: 'Consider using a reputable password manager to generate, store, and manage your passwords securely.',
      gradient: 'from-purple-50 to-violet-50',
      border: 'border-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: FaSyncAlt,
      title: 'Update Passwords Regularly',
      description: 'Change your important passwords every 3-6 months, or immediately if you suspect a breach.',
      gradient: 'from-yellow-50 to-amber-50',
      border: 'border-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      icon: FaEyeSlash,
      title: 'Avoid Personal Information',
      description: 'Don\'t use easily discoverable information like birthdays, names, or common words in your passwords.',
      gradient: 'from-red-50 to-rose-50',
      border: 'border-red-100',
      iconColor: 'text-red-600'
    },
    {
      icon: FaLaptopCode,
      title: 'Be Wary of Phishing',
      description: 'Never enter your password on suspicious websites. Always verify the URL before logging in.',
      gradient: 'from-teal-50 to-cyan-50',
      border: 'border-teal-100',
      iconColor: 'text-teal-600'
    }
  ];

  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">More Security Advice</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tips.map((tip, index) => (
          <div key={index} className={`security-tip-card bg-gradient-to-br ${tip.gradient} p-4 rounded-lg border ${tip.border}`}>
            <div className={`${tip.iconColor} text-2xl mb-2`}>
              <SafeIcon icon={tip.icon} />
            </div>
            <h3 className="font-semibold mb-2">{tip.title}</h3>
            <p className="text-gray-600">{tip.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SecurityAdvice;