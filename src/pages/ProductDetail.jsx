import React from 'react';
import { FaBoxOpen, FaUserEdit, FaTruck, FaHeart } from 'react-icons/fa';
import {  useParams } from 'react-router-dom';

const features = [
  {
    title: 'Order History',
    description: 'View and manage your past orders.',
    icon: <FaBoxOpen className="text-indigo-500 w-7 h-7" />,
    link: '/orders',
  },
  {
    title: 'Profile',
    description: 'Edit your personal information and password.',
    icon: <FaUserEdit className="text-pink-500 w-7 h-7" />,
    link: '/profile',
  },
  {
    title: 'Track Orders',
    description: 'Track the status of your current orders.',
    icon: <FaTruck className="text-green-500 w-7 h-7" />,
    link: '/track',
  },
  {
    title: 'Wishlist',
    description: 'See your saved items and favorites.',
    icon: <FaHeart className="text-red-400 w-7 h-7" />,
    link: '/wishlist',
  },
];

const UserDashboard = () => (
  <div className="min-h-[70vh] bg-gradient-to-br from-gray-50 via-blue-50 to-pink-50 py-12 px-4 flex flex-col items-center font-['Montserrat']">
    {/* Header */}
    <div className="w-full max-w-3xl mb-10 flex items-center gap-4">
      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
        U
      </div>
      <div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-1">Welcome, User!</h2>
        <p className="text-gray-500 text-lg">Manage your account, orders, and favorites all in one place.</p>
      </div>
    </div>
    {/* Feature Cards */}
    <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {features.map((f) => (
        <a
          key={f.title}
          href={f.link}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col items-center text-center hover:-translate-y-1"
        >
          <div className="mb-4">{f.icon}</div>
          <div className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-indigo-600 transition">{f.title}</div>
          <div className="text-gray-500 text-sm">{f.description}</div>
        </a>
      ))}
    </div>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
};

export default UserDashboard; 