import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Heart, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Menu', path: '/menu' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Reservations', path: '/reservations' },
  { name: 'Gifts', path: '/gifts' },
  { name: 'Offers', path: '/offers' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b flex items-center',
        scrolled
          ? 'bg-background/90 backdrop-blur-md h-16 border-outline-variant/20'
          : 'bg-transparent h-20 border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center w-full">
        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold font-serif italic text-primary tracking-tighter shrink-0"
        >
          Swad Ka Ghar
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-[11px] uppercase tracking-[0.2em] font-bold transition-all duration-300 hover:text-primary py-2 border-b-2',
                location.pathname === link.path 
                  ? 'text-primary border-primary' 
                  : 'text-stone-500 border-transparent hover:border-stone-200'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
          <Link to="/account" className="relative p-2.5 text-primary hover:scale-110 transition-all duration-300 rounded-full hover:bg-surface-muted">
            <Heart size={18} />
          </Link>
          <Link to="/cart" className="relative p-2.5 text-primary hover:scale-110 transition-all duration-300 rounded-full hover:bg-surface-muted">
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-primary text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>
          <Link to="/account" className="hidden md:flex p-2.5 text-primary hover:scale-110 transition-all duration-300 rounded-full hover:bg-surface-muted">
            <User size={18} />
          </Link>
          <button
            className="lg:hidden p-2.5 text-primary hover:bg-surface-muted rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="lg:hidden absolute top-full left-0 w-full bg-background border-b border-outline-variant/10 py-10 px-8 flex flex-col space-y-6 shadow-2xl overflow-hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 + 0.1, duration: 0.5 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    'text-xl uppercase tracking-widest font-black transition-colors block',
                    location.pathname === link.path ? 'text-primary' : 'text-stone-400 hover:text-stone-900'
                  )}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="pt-8 mt-4 border-t border-outline-variant/10 flex flex-col gap-4"
            >
               <button className="w-full bg-primary text-white py-5 font-bold uppercase tracking-[0.3em] text-[10px] shadow-xl shadow-primary/20">
                 Order Online
               </button>
               <Link 
                 to="/account" 
                 onClick={() => setIsOpen(false)} 
                 className="w-full text-primary font-bold uppercase tracking-[0.3em] text-[10px] border border-primary/30 py-5 text-center flex items-center justify-center gap-2"
               >
                 <User size={14} /> My Account
               </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
