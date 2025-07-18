import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../features/slices/cartSlice';


const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleUpdateQuantity = (id, delta) => {
    const item = cart.find(i => i.id === id);
    if (item) {
      dispatch(updateQuantity({ id, quantity: Math.max(1, item.quantity + delta) }));
    }
  };

  const handleRemoveItem = id => {
    dispatch(removeFromCart(id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <p className="mb-6 text-gray-500">Looks like you haven’t added anything yet.</p>
        <a
          href="/products"
          className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
        >
          Shop Now
        </a>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-8">Shopping Cart</h2>
      <div className="space-y-6">
        {cart.map(item => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow p-4 gap-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-lg text-gray-800">{item.name}</div>
              <div className="text-pink-600 font-bold text-xl mb-2">₹{item.price}</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUpdateQuantity(item.id, -1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-indigo-100 text-xl font-bold flex items-center justify-center"
                  aria-label="Decrease quantity"
                >-</button>
                <span className="px-3">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.id, 1)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-indigo-100 text-xl font-bold flex items-center justify-center"
                  aria-label="Increase quantity"
                >+</button>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-gray-500">Subtotal:</div>
              <div className="font-bold text-lg">₹{item.price * item.quantity}</div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="text-red-500 hover:text-red-700 p-2"
                aria-label="Remove item"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 bg-white rounded-xl shadow p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-gray-500">Subtotal</div>
          <div className="text-2xl font-bold text-indigo-600">₹{subtotal}</div>
        </div>
        <a
          href="/checkout"
          className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow hover:scale-105 transition"
        >
          Proceed to Checkout
        </a>
      </div>
    </div>
  );
};

export default Cart; 