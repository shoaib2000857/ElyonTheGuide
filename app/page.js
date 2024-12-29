import Link from 'next/link';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center bg-tan p-8">
      <img
        src="/cartoon avatar of Elyon, The Wise Mentor (1).png"
        alt="Elyon Avatar"
        className="w-32 h-32 rounded-full mb-6"
      />
      <h1 className="text-6xl font-serif text-dark-brown mb-6">Welcome to Elyon's Guidance</h1>
      <p className="text-2xl text-dark-brown mb-4">A thoughtful chatbot experience with a wise mentor.</p>
      <div className="flex space-x-4">
        <Link href="/chat" passHref>
          <button className="bg-dark-brown text-white px-8 py-4 rounded-lg text-2xl hover:bg-brown transition duration-300 border-2 border-gold">
            Start Chatting
          </button>
        </Link>
        <Link href="/persona" passHref>
          <button className="bg-dark-brown text-white px-8 py-4 rounded-lg text-2xl hover:bg-brown transition duration-300 border-2 border-gold">
            Learn About Elyon
          </button>
        </Link>
      </div>
    </div>
  );
}