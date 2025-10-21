import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary text-white px-3 py-2 rounded font-bold text-lg">
              VTC
            </div>
            <span className="text-primary font-bold text-xl hidden sm:inline">VALORTRUST</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#about" className="text-gray-700 hover:text-primary transition font-medium">About</a>
            <Link to="/services" className="text-gray-700 hover:text-primary transition font-medium">Services</Link>
            <Link to="/portfolio" className="text-gray-700 hover:text-primary transition font-medium">Portfolio</Link>
            <Link to="/insights" className="text-gray-700 hover:text-primary transition font-medium">Blog</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition font-medium">Contact</Link>
            
            {isAdmin && (
              <Link to="/admin" className="text-gray-700 hover:text-primary transition font-medium">Admin</Link>
            )}
            
            {user ? (
              <Button onClick={signOut} variant="outline">Sign Out</Button>
            ) : (
              <Link to="/auth">
                <Button className="bg-primary hover:bg-blue-800 text-white">Get Started</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fas fa-${isOpen ? 'times' : 'bars'} text-2xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <div className="flex flex-col space-y-4">
              <a href="/#about" className="text-gray-700 hover:text-primary transition font-medium">About</a>
              <Link to="/services" className="text-gray-700 hover:text-primary transition font-medium">Services</Link>
              <Link to="/portfolio" className="text-gray-700 hover:text-primary transition font-medium">Portfolio</Link>
              <Link to="/insights" className="text-gray-700 hover:text-primary transition font-medium">Blog</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary transition font-medium">Contact</Link>
              
              {isAdmin && (
                <Link to="/admin" className="text-gray-700 hover:text-primary transition font-medium">Admin</Link>
              )}
              
              {user ? (
                <Button onClick={signOut} variant="outline" className="w-full">Sign Out</Button>
              ) : (
                <Link to="/auth" className="w-full">
                  <Button className="bg-primary hover:bg-blue-800 text-white w-full">Get Started</Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
