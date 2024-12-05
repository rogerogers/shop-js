'use client';
import {
  MobileNavigation,
  Navigation,
  PadNavigation,
} from '@/components/layout/navigation';
import { useState } from 'react';

function PageHeader() {
  const [mdOptionsToggle, setMdOptionsToggle] = useState(true);

  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="dark:bg-gray-900">
      <div>
        <div className="relative">
          {/* For large screens */}
          <Navigation
            mdOptionsToggle={mdOptionsToggle}
            setMdOptionsToggle={setMdOptionsToggle}
            setShowMenu={setShowMenu}
          />
          {/* For md screen size */}
          <PadNavigation mdOptionsToggle={mdOptionsToggle} />
          {/* For small screen */}
          <MobileNavigation showMenu={showMenu} setShowMenu={setShowMenu} />
        </div>
      </div>
    </div>
  );
}

export { PageHeader };
