The entry point is src/App.jsx.

MainLayout provides a sticky header with navigation links (Home, Products, Cart)

Home section with a background image, overlay, and a “Shop Now” button linking to /products, uses a Toast/Modam component for feedback when adding to cart

Product List page displays a grid of demo products (36, with cycling names, images, etc.)

Uses Redux Toolkit for global state (products, cart, user).
The store is set up in src/app/store.js and slices are in src/features/slices/ (Work Under Progress)

Toast: Reusable notification for success messages, appears in the lower right and auto-dismisses

Uses Tailwind CSS utility classes for all styling

Responsive design for mobile and desktop

