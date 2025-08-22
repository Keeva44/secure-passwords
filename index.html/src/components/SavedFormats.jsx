import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import SafeIcon from '../common/SafeIcon';

const { FaSave, FaFolderOpen, FaTrash } = FaIcons;

function SavedFormats({ showToast, setSettings, setActiveSection }) {
  const [savedFormats, setSavedFormats] = useState([]);

  useEffect(() => {
    loadSavedFormats();
  }, []);

  const loadSavedFormats = () => {
    const formats = JSON.parse(localStorage.getItem('passwordFormats') || '[]');
    setSavedFormats(formats);
  };

  const saveCurrentFormat = () => {
    // Get current settings from localStorage or default values
    const currentSettings = JSON.parse(localStorage.getItem('currentPasswordSettings') || '{"length":12,"uppercase":true,"lowercase":true,"numbers":true,"symbols":false}');
    
    const format = {
      ...currentSettings,
      id: Date.now()
    };

    const formats = JSON.parse(localStorage.getItem('passwordFormats') || '[]');
    formats.push(format);
    localStorage.setItem('passwordFormats', JSON.stringify(formats));
    
    loadSavedFormats();
    showToast('Format saved successfully!');
  };

  const handleUseFormat = (format) => {
    setSettings(format);
    localStorage.setItem('currentPasswordSettings', JSON.stringify(format));
    setActiveSection('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('Format applied!');
  };

  const deleteFormat = (id) => {
    const formats = savedFormats.filter(f => f.id !== id);
    localStorage.setItem('passwordFormats', JSON.stringify(formats));
    setSavedFormats(formats);
    showToast('Format deleted!');
  };

  const getFormatDescription = (format) => {
    const types = [];
    if (format.uppercase) types.push('Uppercase');
    if (format.lowercase) types.push('Lowercase');
    if (format.numbers) types.push('Numbers');
    if (format.symbols) types.push('Symbols');
    return `${format.length} chars, ${types.join('/')}`;
  };

  return (
    <section className="saved-formats bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Saved Password Formats</h2>
        <button
          onClick={saveCurrentFormat}
          className="py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg shadow-md transition duration-300 flex items-center"
        >
          <SafeIcon icon={FaSave} className="mr-2" />
          Save Current Format
        </button>
      </div>
      
      {savedFormats.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <SafeIcon icon={FaFolderOpen} className="text-3xl mb-2 mx-auto" />
          <p>No saved formats yet. Save your current password format to see it here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {savedFormats.map(format => (
            <div key={format.id} className="format-card bg-gray-50 p-4 rounded-lg border border-gray-200">
              <div className="mb-3">
                <p className="font-medium">{getFormatDescription(format)}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleUseFormat(format)}
                  className="flex-1 py-1 px-3 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition"
                >
                  Use
                </button>
                <button
                  onClick={() => deleteFormat(format.id)}
                  className="py-1 px-3 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition"
                >
                  <SafeIcon icon={FaTrash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedFormats;