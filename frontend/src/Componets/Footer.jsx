import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-emerald-400">Instagram</a>
        </div>
        <p className="text-sm text-slate-300">&copy; {new Date().getFullYear()} Worker & Work. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
