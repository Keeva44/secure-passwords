import React from 'react';
import * as FaIcons from 'react-icons/fa';
import SafeIcon from '../common/SafeIcon';

const { FaTimes } = FaIcons;

function Modal({ modal, closeModal }) {
  if (!modal.show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">{modal.title}</h2>
          <button
            onClick={closeModal}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            <SafeIcon icon={FaTimes} />
          </button>
        </div>
        <div className="p-6">
          {modal.content}
        </div>
      </div>
    </div>
  );
}

export default Modal;