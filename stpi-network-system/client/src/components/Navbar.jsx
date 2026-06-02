import { Menu } from 'lucide-react';
import { GlobalSearch } from './search/GlobalSearch';
import { NotificationCenter } from './layout/NotificationCenter';
import { ProfileDropdown } from './layout/ProfileDropdown';

export const Navbar = ({ onMenuClick }) => (
  <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-700/60 bg-surface-900/90 px-4 backdrop-blur-md lg:px-6">
    <div className="flex items-center gap-3 min-w-0">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden shrink-0"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>
      <p className="hidden sm:block text-xs text-slate-500 truncate">
        STPI Smart Network · Simulated monitoring
      </p>
    </div>

    <div className="flex items-center gap-2 sm:gap-3">
      <GlobalSearch />
      <NotificationCenter />
      <ProfileDropdown />
    </div>
  </header>
);
