'use client';

import { useTheme } from 'next-themes';
import { Switch } from '../ui/switch';
import { useEffect, useState } from 'react';
import { ThemeSwitch } from '../ui/ThemeSwitch';

export default function ThemeToggle() {
  const {theme, setTheme } = useTheme();
  const [isLight, setIsLight] = useState(false);
  console.log({theme})
  useEffect(() => {
    if (isLight) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }, [isLight]);

  return <ThemeSwitch onCheckedChange={() => setIsLight((prev) => !prev)} />;
  // return <Switch onCheckedChange={() => setIsLight((prev) => !prev)}/>
}
