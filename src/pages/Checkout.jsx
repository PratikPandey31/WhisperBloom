import React, { useState } from 'react';

const Checkout = () => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    city: '',
    zip: '',
    card: '',
    expiry: '',
    cvc: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center">
          <span className="text-4xl mb-4">🎉</span>
          <h2 className="text-2xl font-bold text-pink-600 mb-2">Order Placed!</h2>
          <p className="text-gray-600 mb-4 text-center">Thank you for your purchase. Your order is being processed.</p>
          <a href="/" className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 transition">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white/80 rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row gap-10 mt-8 font-['Montserrat']">

      <form className="flex-1 flex flex-col gap-6" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Shipping Details</h2>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          required
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none w-1/2"
            required
          />
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={form.zip}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none w-1/2"
            required
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mt-6 mb-2">Payment Details</h2>
        <input
          type="text"
          name="card"
          placeholder="Card Number"
          value={form.card}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
          required
        />
        <div className="flex gap-4">
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={form.expiry}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none w-1/2"
            required
          />
          <input
            type="text"
            name="cvc"
            placeholder="CVC"
            value={form.cvc}
            onChange={handleChange}
            className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none w-1/2"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition text-lg"
        >
          Place Order
        </button>
      </form>
      <div className="w-full md:w-80 bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-4 h-fit">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Order Summary</h3>
        <div className="flex justify-between text-gray-600">
          <span>Items</span>
          <span>₹3,998</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span>₹99</span>
        </div>
        <div className="flex justify-between text-gray-800 font-bold border-t border-gray-200 pt-2">
          <span>Total</span>
          <span>₹4,097</span>
        </div>
        <div className="flex gap-2 mt-2">
          <span className="bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full text-xs font-semibold">Visa</span>
          <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-xs font-semibold">Mastercard</span>
          <span className="bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full text-xs font-semibold">UPI</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 