import React from 'react';
import * as FaIcons from 'react-icons/fa';
import SafeIcon from '../common/SafeIcon';

const { FaLock, FaBolt, FaGift, FaShieldAlt } = FaIcons;

function About() {
  const features = [
    {
      icon: FaLock,
      title: '100% Secure',
      description: 'All operations happen locally in your browser',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      icon: FaBolt,
      title: 'Fast & Easy',
      description: 'Generate strong passwords in seconds',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      icon: FaGift,
      title: 'Free Forever',
      description: 'No hidden costs or premium features',
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      icon: FaShieldAlt,
      title: 'Trusted by Thousands',
      description: 'Join our community of security-conscious users',
      bgColor: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    }
  ];

  return (
    <section className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">About Secure Password Generator</h2>
      
      <div className="prose max-w-none">
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Our Mission</h3>
          <p className="text-gray-600 mb-4">
            At Secure Password Generator, we believe that everyone deserves to have strong, secure passwords without the hassle. 
            Our mission is to provide a simple, free, and secure tool that helps users create robust passwords and verify their safety.
          </p>
          <p className="text-gray-600">
            We understand that in today's digital world, password security is more important than ever. That's why we've created 
            a comprehensive tool that not only generates strong passwords but also checks them against known data breaches.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">What We Do</h3>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Generate secure, random passwords with customizable options</li>
            <li>Analyze password strength with real-time feedback</li>
            <li>Check passwords against the Have I Been Pwned database for breaches</li>
            <li>Save preferred password formats for quick generation</li>
            <li>Provide security tips and best practices</li>
          </ul>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Our Commitment to Privacy</h3>
          <p className="text-gray-600 mb-4">
            We take your privacy seriously. All password generation happens locally in your browser - we never store, transmit, 
            or save any passwords you generate. Your security is our top priority.
          </p>
          <p className="text-gray-600">
            When checking password safety, we use the k-anonymity method to ensure your actual password is never exposed. 
            Only a partial hash is sent to the breach database, protecting your information at all times.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-3">Why Choose Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div key={index} className={`${feature.bgColor} p-4 rounded-lg`}>
                <SafeIcon icon={feature.icon} className={`${feature.iconColor} text-2xl mb-2`} />
                <h4 className="font-semibold mb-1">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;