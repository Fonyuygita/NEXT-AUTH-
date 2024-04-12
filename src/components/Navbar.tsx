import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white text-green-800 h-[100px] border border-b-2 ">
      <div className="container mx-auto px-4 py-9 flex items-center justify-center gap-7 ">
        <div className="flex items-center">
          <Link href="/" className="flex items-center justify-center text-[#fff] w-5 h-5 bg-green-800 p-7 rounded rounded-full py-4">
          <span>CH</span>
          </Link>
        </div>
        <div className="space-x-7">
          <Link href="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link href="/login" className="hover:text-blue-500">
            Login
          </Link>
          <Link className="hover:text-blue-500" href="/register">
            Register
          </Link>
          <Link href="/admin" className="hover:text-blue-500">
            Admin
          </Link>
          <Link href="" className="hover:text-blue-500">
            Chat
          </Link>
        </div>
        </div>
      
    </nav>
  );
};

export default Navbar;