import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import SafeIcon from '../common/SafeIcon';

const { FaLightbulb } = FaIcons;

function DailyTip() {
  const [tip, setTip] = useState('');

  const dailyTips = [
    "Never reuse passwords across multiple accounts.",
    "Use a unique password for each of your important accounts.",
    "Consider using a password manager to store your passwords securely.",
    "Enable two-factor authentication whenever possible.",
    "Change your passwords immediately if you suspect a breach.",
    "Avoid using personal information in your passwords.",
    "The longer your password, the more secure it is.",
    "Consider using passphrases - random words that are easy to remember but hard to guess.",
    "Don't share your passwords with anyone, even trusted friends or family.",
    "Regularly update your passwords for important accounts."
  ];

  useEffect(() => {
    const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
    setTip(randomTip);
  }, []);

  return (
    <section className="daily-tip bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-start">
        <div className="bg-blue-100 p-3 rounded-full mr-4">
          <SafeIcon icon={FaLightbulb} className="text-blue-600 text-xl" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">💡 Tip of the Day:</h3>
          <p className="text-gray-700">{tip}</p>
        </div>
      </div>
    </section>
  );
}

export default DailyTip;