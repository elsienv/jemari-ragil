import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../features/cart/hooks/useCart';
import { useWishlist } from '../../features/wishlist/hooks/useWishlist';
import { useDemoSession } from '../../features/session/hooks/useDemoSession';

export function useHeaderNavigation() {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const { profile, leaveDemo } = useDemoSession();
  const location = useLocation();
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const itemCount = cart.reduce((total, item) => total + Number(item.quantity || 0), 0);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
    setQuery(new URLSearchParams(location.search).get('q') || '');
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (searchOpen) searchInput.current?.focus();
  }, [searchOpen]);

  const closePanels = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(query.trim() ? '/store?q=' + encodeURIComponent(query.trim()) : '/store');
    closePanels();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') closePanels();
  };

  const toggleSearch = () => {
    setSearchOpen((previous) => !previous);
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen((previous) => !previous);
    setSearchOpen(false);
  };

  return {
    wishlist,
    profile,
    leaveDemo,
    itemCount,
    searchInput,
    menuOpen,
    searchOpen,
    query,
    setQuery,
    closePanels,
    handleSearch,
    handleKeyDown,
    toggleSearch,
    toggleMenu,
  };
}
