import React from 'react';

function HowToUse() {
  const steps = [
    {
      number: 1,
      title: 'Set Your Preferences',
      description: 'Choose password length and character types (uppercase, lowercase, numbers, symbols).'
    },
    {
      number: 2,
      title: 'Generate Password',
      description: 'Click "Generate Password" to create a secure password based on your settings.'
    },
    {
      number: 3,
      title: 'Check & Copy',
      description: 'Check password safety and copy it to your clipboard for immediate use.'
    }
  ];

  return (
    <section id="how-to-use" className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">How to Use</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map(step => (
          <div key={step.number} className="flex items-start">
            <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
              {step.number}
            </div>
            <div>
              <h3 className="font-semibold mb-1">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowToUse;