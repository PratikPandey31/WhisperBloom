import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaEye, FaFilter } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/slices/cartSlice';
import Toast from '../components/Toast';
import PropTypes from 'prop-types';

const allProducts = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  name: ['Classic Denim Jacket', 'Summer Dress', 'Kids Sneakers', 'Leather Handbag'][i % 4],
  price: [2499, 1299, 999, 3499][i % 4],
  image: [
    'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  ][i % 4],
  color: ['blue', 'pink', 'black', 'white'][i % 4],
  category: ['Men', 'Women', 'Kids', 'Accessories'][i % 4],
}));

const categories = ['Men', 'Women', 'Kids', 'Accessories'];
const colors = ['blue', 'pink', 'black', 'white', 'green'];
const minPrice = 500;
const maxPrice = 4000;
const PAGE_SIZE = 9;

function QuickViewModal({ product, onClose, onAddToCart }) {
  const dispatch = useDispatch();
  if (!product) return null;
  return (
    <dialog open className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fadeInModal">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-10 relative flex flex-col items-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-pink-500 text-3xl font-bold focus:outline-none"
          aria-label="Close quick view"
        >
          &times;
        </button>
        <img src={product?.image} alt={product?.name} className="w-64 h-64 object-cover rounded-2xl mb-6" />
        <div className="font-bold text-3xl text-gray-800 mb-2 text-center">{product?.name}</div>
        <div className="text-pink-600 font-bold text-2xl mb-6">₹{product?.price}</div>
        <button
          className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition text-lg mt-2 active:translate-y-1 focus:outline-none"
          onClick={() => { dispatch(addToCart(product)); onAddToCart && onAddToCart(); onClose(); }}
          aria-label={`Add ${product?.name} to cart`}
        >
          Add to Cart
        </button>
      </div>
      <style>{`
        @keyframes fadeInModal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </dialog>
  );
}

QuickViewModal.propTypes = {
  product: PropTypes.object,
  onClose: PropTypes.func,
  onAddToCart: PropTypes.func,
};

const ProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [sort, setSort] = useState('newest');
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loader = useRef();
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [toast, setToast] = useState(false);

  const filtered = allProducts.filter(p =>
    (!selectedCategory || p.category === selectedCategory) &&
    (!selectedColor || p.color === selectedColor) &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase())) &&
    (p.price >= priceRange[0] && p.price <= priceRange[1])
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'priceLow') return a.price - b.price;
    if (sort === 'priceHigh') return b.price - a.price;
    if (sort === 'popularity') return a.id - b.id;
    return b.id - a.id;
  });

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setVisibleProducts(sorted.slice(0, page * PAGE_SIZE));
      setLoading(false);
    }, 600);
    return () => clearTimeout(timeout);
  }, [page, sort, selectedCategory, selectedColor, search]);

  useEffect(() => {
    if (!loader.current) return;
    const observer = new window.IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && visibleProducts.length < sorted.length && !loading) {
          setPage(p => p + 1);
        }
      },
      { threshold: 1 }
    );
    observer.observe(loader.current);
    return () => observer.disconnect();
  }, [visibleProducts, sorted.length, loading]);

  useEffect(() => {
    setPage(1);
  }, [sort, selectedCategory, selectedColor, search]);

  const showToast = () => {
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gradient-to-br from-gray-50 via-blue-50 to-pink-50 min-h-[80vh] font-['Montserrat'] relative">
      <button
        className="md:hidden fixed bottom-8 right-8 z-30 bg-gradient-to-r from-indigo-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:scale-110 transition"
        onClick={() => setShowFilter(v => !v)}
        aria-label="Show filters"
      >
        <FaFilter className="w-6 h-6" />
      </button>
      <aside
        className={`sticky top-24 w-full md:w-64 bg-white/95 rounded-3xl shadow-2xl border-2 border-gray-200 p-8 mb-6 md:mb-0 z-20 transition-all duration-300 ${showFilter ? 'block' : 'hidden'} md:block max-h-[calc(100vh-7rem)] flex flex-col`}
        aria-label="Product Filters"
      >
        <h3 className="text-xl font-bold mb-6 text-gray-800">Filters</h3>
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="mb-6">
            <div className="font-semibold mb-2 text-gray-700">Category</div>
            {categories.map(cat => (
              <label key={cat} className="flex items-center mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                  className="accent-indigo-500 mr-2"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
          <div className="mb-6">
            <div className="font-semibold mb-2 text-gray-700">Color</div>
            <div className="flex gap-2 flex-wrap">
              {colors.map(color => (
                <button
                  key={color}
                  className={`w-7 h-7 rounded-full border-2 border-gray-200 focus:ring-2 focus:ring-indigo-400 transition ${selectedColor === color ? 'ring-2 ring-indigo-500 border-indigo-500' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(selectedColor === color ? '' : color)}
                  aria-label={color}
                />
              ))}
            </div>
          </div>
          <div className="mb-6">
            <div className="font-semibold mb-2 text-gray-700">Price</div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Min: ₹{priceRange[0]}</span>
                <span>Max: ₹{priceRange[1]}</span>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  type="range"
                  min={minPrice}
                  max={priceRange[1]}
                  value={priceRange[0]}
                  onChange={e => {
                    const newMin = Math.min(Number(e.target.value), priceRange[1]);
                    setPriceRange([newMin, priceRange[1]]);
                  }}
                  className="w-full accent-blue-500"
                  aria-label="Minimum price"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 border-t border-gray-200 mt-4 flex flex-col gap-2">
          <button
            className="w-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white py-2 rounded-full font-semibold shadow hover:scale-105 transition"
            onClick={() => { setSelectedCategory(''); setSelectedColor(''); }}
          >
            Clear All
          </button>
          <button
            className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-2 rounded-full font-semibold shadow hover:scale-105 transition"
            onClick={() => setShowFilter(false)}
          >
            Apply Filters
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
          <div className="text-xl font-bold text-gray-800">All Products</div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:ring-2 focus:ring-indigo-400 outline-none"
              />
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="rounded-full border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {visibleProducts.map(product => (
            <div
              key={product.id}
              className="group bg-white/70 backdrop-blur-md rounded-2xl shadow hover:shadow-2xl transition-all p-4 flex flex-col items-center relative overflow-hidden border border-gray-100 animate-fadeIn"
              style={{ animation: 'fadeIn 0.1s' }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              />
              <div className="mt-4 w-full flex flex-col items-center">
                <div className="font-semibold text-lg text-gray-800 mb-1">{product.name}</div>
                <div className="text-pink-600 font-bold text-xl mb-2">₹{product.price}</div>
              </div>
              <button
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-3 py-1.5 rounded-full font-semibold shadow-md transition-all duration-300 border-2 border-white flex items-center gap-1 text-sm hover:scale-105 focus:outline-none"
                style={{ pointerEvents: 'auto' }}
                onClick={() => setQuickViewProduct(product)}
                aria-label={`Quick view ${product.name}`}
              >
                <FaEye className="inline" />
                <span className="hidden sm:inline">Quick View</span>
              </button>
            </div>
          ))}
        </div>
        <div ref={loader} className="flex justify-center mt-10 min-h-[60px]">
          {loading && (
            <div className="flex flex-col items-center gap-2">
              <span className="relative flex h-12 w-12">
                <span className="absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 opacity-30 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-12 w-12 border-4 border-t-transparent border-b-transparent border-l-indigo-500 border-r-pink-500 animate-spin"></span>
              </span>
              <span className="text-indigo-500 font-semibold animate-pulse">Loading more products...</span>
            </div>
          )}
        </div>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
      <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} onAddToCart={showToast} />
      <Toast message="Added to cart!" show={toast} />
    </div>
  );
};

export default ProductList;