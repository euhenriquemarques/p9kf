import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="text-white text-xl font-bold">Navbar</div>
      <ul className="flex space-x-4">
        <li><a href="/" className="text-white hover:underline">Home</a></li>
        <li><a href="/cadastro/banco" className="text-white hover:underline">Banco</a></li>
        <li><a href="#" className="text-white hover:underline">About</a></li>
        <li><a href="#" className="text-white hover:underline">Contact</a></li>
      </ul>
    </div>
  </nav>
  );
};

export default Navbar;