import React, { useState } from 'react';
import Toast from '../components/Toast';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/slices/cartSlice';

const featuredProducts = [
  { name: 'Classic Denim Jacket', price: '₹2,499', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80', badge: 'Trending' },
  { name: 'Summer Dress', price: '₹1,299', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', badge: 'New' },
  { name: 'Kids Sneakers', price: '₹999', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80', badge: 'Best Seller' },
  { name: 'Leather Handbag', price: '₹3,499', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80', badge: 'Limited' },
];

const categories = [
  { name: 'Men', image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80' },
  { name: 'Women', image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80' },
  { name: 'Kids', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
];

const Home = () => {
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  const handleAddToCart = (prod) => {
    dispatch(addToCart({
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Date.now(),
      name: prod.name,
      price: prod.price,
      image: prod.image,
      quantity: 1,
    }));
    showToast();
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-blue-50 to-pink-50 min-h-screen font-['Montserrat']">
      <section className="relative flex items-center justify-center min-h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
          alt="Fashion Banner"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-indigo-900/40 to-transparent z-10" />
        <div className="relative z-20 text-center px-4 py-20 max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4 animate-fadeInUp">
            Discover the Latest in Fashion
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-8 font-light animate-fadeInUp delay-100">
            Shop top brands, exclusive deals, and trending styles for everyone
          </p>
          <Link
            to="/products"
            className="inline-block bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-bold px-10 py-4 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 text-lg animate-fadeInUp delay-200"
          >
            Shop Now
          </Link>
        </div>
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="#f3f4f6" d="M0,32L48,37.3C96,43,192,53,288,69.3C384,85,480,107,576,112C672,117,768,107,864,90.7C960,75,1056,53,1152,53.3C1248,53,1344,75,1392,85.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"/>
        </svg>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center tracking-tight">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to="/products"
              className="group relative rounded-2xl overflow-hidden shadow-lg bg-white/60 hover:shadow-2xl transition-all duration-300"
              aria-label={`Shop ${cat.name}`}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-80 transition duration-300" />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 px-4 py-2 rounded-full text-lg font-semibold text-gray-800 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300 shadow">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-10 text-gray-800 text-center tracking-tight">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {featuredProducts.map((prod) => (
            <div
              key={prod.name}
              className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group"
            >
              <div className="relative">
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {prod.badge && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-pink-500 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    {prod.badge}
                  </span>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">{prod.name}</h3>
                  <p className="text-pink-600 font-bold text-2xl">{prod.price}</p>
                </div>
                <button
                  className="mt-6 bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 active:translate-y-1 focus:outline-none"
                  aria-label={`Add ${prod.name} to cart`}
                  onClick={() => handleAddToCart(prod)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 9m13-9l2 9m-5-9V6a2 2 0 10-4 0v7" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Toast message="Added to cart!" show={toast} />
    </div>
  );
};

export default Home; 