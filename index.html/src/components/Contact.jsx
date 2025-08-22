import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import SafeIcon from '../common/SafeIcon';

const { FaEnvelope, FaPhone, FaMapMarkerAlt, FaStar, FaRegStar } = FaIcons;

function Contact({ showToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [reviewData, setReviewData] = useState({
    name: '',
    email: '',
    rating: 0,
    title: '',
    review: '',
    recommend: true
  });

  const [activeTab, setActiveTab] = useState('contact');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`[Contact Form] ${formData.subject}`);
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from Secure Password Generator Contact Form
    `);
    
    const mailtoLink = `mailto:contact@securepasswordgenerator.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    showToast('Email client opened! Please send the message from your email application.');
    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    
    // Create mailto link with review data
    const subject = encodeURIComponent(`[Review] ${reviewData.title || 'User Review'}`);
    const body = encodeURIComponent(`
REVIEW SUBMISSION

Reviewer: ${reviewData.name}
Email: ${reviewData.email}
Rating: ${reviewData.rating}/5 stars
Review Title: ${reviewData.title}

Review:
${reviewData.review}

Would recommend to others: ${reviewData.recommend ? 'Yes' : 'No'}

---
Submitted via Secure Password Generator Review Form
    `);
    
    const mailtoLink = `mailto:reviews@securepasswordgenerator.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    showToast('Thank you for your review! Email client opened - please send the review.');
    setReviewData({
      name: '',
      email: '',
      rating: 0,
      title: '',
      review: '',
      recommend: true
    });
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleReviewChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setReviewData(prev => ({
      ...prev,
      [e.target.name]: value
    }));
  };

  const handleStarClick = (rating) => {
    setReviewData(prev => ({ ...prev, rating }));
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      info: 'contact@securepasswordgenerator.com',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: FaPhone,
      title: 'Phone',
      info: '+1 (555) 123-4567',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      info: 'San Francisco, CA, USA',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  const businessHours = [
    'Monday - Friday: 9:00 AM - 6:00 PM PST',
    'Saturday: 10:00 AM - 4:00 PM PST',
    'Sunday: Closed'
  ];

  const faqs = [
    {
      question: 'How quickly do you respond to messages?',
      answer: 'We typically respond to all inquiries within 24-48 hours during business days.'
    },
    {
      question: 'Do you offer technical support?',
      answer: 'Yes, we provide technical support for all features of our password generator. Please select "Technical Support" as the subject when contacting us.'
    },
    {
      question: 'Can I suggest new features?',
      answer: 'Absolutely! We love hearing from our users and welcome feature suggestions. Use the "Feature Request" option in the contact form.'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
      
      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('contact')}
          className={`pb-2 px-1 font-medium transition ${
            activeTab === 'contact'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          Contact Form
        </button>
        <button
          onClick={() => setActiveTab('review')}
          className={`pb-2 px-1 font-medium transition ${
            activeTab === 'review'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          Leave a Review
        </button>
      </div>

      {activeTab === 'contact' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-gray-600 mb-6">
              Have questions, feedback, or need help with our password generator? We'd love to hear from you! Fill out the form or reach out using the contact information below.
            </p>
            
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <div key={index} className="flex items-start">
                  <div className={`${contact.bgColor} ${contact.iconColor} p-3 rounded-full mr-4`}>
                    <SafeIcon icon={contact.icon} />
                  </div>
                  <div>
                    <h4 className="font-semibold">{contact.title}</h4>
                    <p className="text-gray-600">{contact.info}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h4 className="font-semibold mb-3">Business Hours</h4>
              <ul className="text-gray-600 space-y-1">
                {businessHours.map((hour, index) => (
                  <li key={index}>{hour}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Feature Request</option>
                  <option>Report a Bug</option>
                  <option>Partnership</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your message..."
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === 'review' && (
        <div className="max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold mb-4">Share Your Experience</h3>
          <p className="text-gray-600 mb-6">
            We value your feedback! Please share your honest experience with our password generator to help us improve and help other users.
          </p>
          
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-2">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={reviewData.name}
                  onChange={handleReviewChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              
              <div>
                <label className="block text-gray-700 mb-2">Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={reviewData.email}
                  onChange={handleReviewChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Rating</label>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleStarClick(star)}
                    className="text-2xl focus:outline-none transition hover:scale-110"
                  >
                    <SafeIcon
                      icon={star <= reviewData.rating ? FaStar : FaRegStar}
                      className={star <= reviewData.rating ? 'text-yellow-400' : 'text-gray-300'}
                    />
                  </button>
                ))}
                <span className="ml-2 text-gray-600">
                  {reviewData.rating > 0 ? `${reviewData.rating}/5 stars` : 'Click to rate'}
                </span>
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Review Title</label>
              <input
                type="text"
                name="title"
                value={reviewData.title}
                onChange={handleReviewChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief summary of your experience"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Your Review</label>
              <textarea
                name="review"
                value={reviewData.review}
                onChange={handleReviewChange}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your honest feedback about the password generator. What did you like? What could be improved?"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                name="recommend"
                checked={reviewData.recommend}
                onChange={handleReviewChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label className="ml-2 text-gray-700">
                I would recommend this tool to others
              </label>
            </div>
            
            <button
              type="submit"
              disabled={reviewData.rating === 0}
              className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow-md transition duration-300"
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* FAQ Section - Show only on contact tab */}
      {activeTab === 'contact' && (
        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">{faq.question}</h4>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Contact;