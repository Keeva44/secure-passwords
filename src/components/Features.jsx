import React from 'react';
import * as FaIcons from 'react-icons/fa';
import SafeIcon from '../common/SafeIcon';

const { FaRandom, FaChartLine, FaShieldAlt } = FaIcons;

function Features() {
  const features = [
    {
      icon: FaRandom,
      title: 'Customizable Generation',
      description: 'Create passwords with your preferred length and character types including uppercase, lowercase, numbers, and symbols.',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: FaChartLine,
      title: 'Strength Analysis',
      description: 'Real-time password strength evaluation with color-coded indicators to ensure your passwords are secure.',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: FaShieldAlt,
      title: 'Breach Detection',
      description: 'Check if your password has been compromised in known data breaches using the Have I Been Pwned API.',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <section id="features" className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div key={index} className={`${feature.bgColor} p-4 rounded-lg`}>
            <div className={`${feature.iconColor} text-2xl mb-2`}>
              <SafeIcon icon={feature.icon} />
            </div>
            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;