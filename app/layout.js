import './globals.css'; // Import global styles

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/cartoon avatar of Elyon, The Wise Mentor (1).png" />
      </head>
      <body className="bg-tan text-brown font-sans">
        <div className="container mx-auto p-5">
          <header className="bg-light-brown p-6 rounded-lg shadow-md mb-8 border-t-4 border-gold">
            <h1 className="text-5xl font-serif text-dark-brown mb-2">Elyon, The Wise Mentor</h1>
            <p className="text-2xl text-dark-brown">Guiding you with wisdom and patience</p>
          </header>
          <main className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gold">{children}</main>
        </div>
      </body>
    </html>
  );
}