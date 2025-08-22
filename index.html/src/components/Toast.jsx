import React from 'react';

function Toast({ toast }) {
  return (
    <div 
      className={`fixed bottom-5 right-5 px-6 py-3 rounded-lg shadow-lg text-white transition-all duration-300 z-50 ${
        toast.show ? 'transform translate-y-0 opacity-100' : 'transform translate-y-20 opacity-0'
      } ${toast.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}
    >
      {toast.message}
    </div>
  );
}

export default Toast;