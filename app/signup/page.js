import Link from 'next/link';

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-tan">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border-t-4 border-gold">
        <h1 className="text-3xl font-serif text-dark-brown mb-6">Sign Up</h1>
        <form>
          <div className="mb-4">
            <label className="block text-dark-brown mb-2" htmlFor="name">Name</label>
            <input className="w-full p-2 border rounded-lg" type="text" id="name" name="name" required />
          </div>
          <div className="mb-4">
            <label className="block text-dark-brown mb-2" htmlFor="email">Email</label>
            <input className="w-full p-2 border rounded-lg" type="email" id="email" name="email" required />
          </div>
          <div className="mb-4">
            <label className="block text-dark-brown mb-2" htmlFor="password">Password</label>
            <input className="w-full p-2 border rounded-lg" type="password" id="password" name="password" required />
          </div>
          <button className="w-full bg-dark-brown text-white p-2 rounded-lg hover:bg-brown transition duration-300" type="submit">Sign Up</button>
        </form>
        <p className="mt-4 text-dark-brown">Already have an account? <Link href="/login" className="text-gold">Login</Link></p>
      </div>
    </div>
  );
}