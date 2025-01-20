"use client"; // Add this directive

import './globals.css'; // Import global styles
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Layout({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/cartoon avatar of Elyon, The Wise Mentor (1).png" />
      </head>
      <body className={`bg-tan text-brown font-sans ${darkMode ? 'dark' : ''}`}>
        <div className="container mx-auto p-5">
          <header className="bg-light-brown p-6 rounded-lg shadow-md mb-8 border-t-4 border-gold">
            <nav className="flex justify-between items-center mb-4">
              <h1 className="text-5xl font-serif text-dark-brown">Elyon, The Wise Mentor</h1>
              <div>
                <Link href="/login" className="text-dark-brown hover:text-gold mx-2">Login</Link>
                <Link href="/signup" className="text-dark-brown hover:text-gold mx-2">Signup</Link>
                <button onClick={toggleDarkMode} className="ml-4 p-2 bg-dark-brown text-white rounded-lg hover:bg-brown transition duration-300">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </nav>
            <p className="text-2xl text-dark-brown">Guiding you with wisdom and patience</p>
          </header>
          <main className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gold">{children}</main>
        </div>
      </body>
    </html>
  );
}