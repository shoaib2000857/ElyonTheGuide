import Link from 'next/link';

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-tan">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md border-t-4 border-gold">
        <h1 className="text-3xl font-serif text-dark-brown mb-6">Login</h1>
        <form>
          <div className="mb-4">
            <label className="block text-dark-brown mb-2" htmlFor="email">Email</label>
            <input className="w-full p-2 border rounded-lg" type="email" id="email" name="email" required />
          </div>
          <div className="mb-4">
            <label className="block text-dark-brown mb-2" htmlFor="password">Password</label>
            <input className="w-full p-2 border rounded-lg" type="password" id="password" name="password" required />
          </div>
          <button className="w-full bg-dark-brown text-white p-2 rounded-lg hover:bg-brown transition duration-300" type="submit">Login</button>
        </form>
        <p className="mt-4 text-dark-brown">Don't have an account? <Link href="/signup" className="text-gold">Sign up</Link></p>
      </div>
    </div>
  );
}