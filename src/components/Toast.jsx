import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

function Toast({ message, show }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-[100] transition-all duration-500 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'} bg-white shadow-2xl rounded-xl px-6 py-4 flex items-center gap-3 border border-pink-200`}
      style={{ minWidth: 220 }}
    >
      <FaCheckCircle className="text-green-500 text-xl" />
      <span className="text-gray-800 font-semibold">{message}</span>
    </div>
  );
}

export default Toast; 