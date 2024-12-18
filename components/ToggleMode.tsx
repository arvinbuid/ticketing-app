'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

export default function ToggleMode() {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const dark = theme === 'dark';

  if (!isMounted) {
    return <Button variant="outline" size="icon" disabled={true}></Button>;
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(`${dark ? 'light' : 'dark'}`)}
      className="group"
    >
      {dark ? (
        <Sun className="hover:cursor-pointer group-hover:text-primary" />
      ) : (
        <Moon className="hover:cursor-pointer group-hover:text-primary" />
      )}
    </Button>
  );
}
