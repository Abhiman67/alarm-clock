"use client";

import type { ReactNode } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';

type TimeFormat = '12h' | '24h';

interface SettingsContextProps {
  timeFormat: TimeFormat;
  setTimeFormat: (format: TimeFormat) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [timeFormat, setTimeFormatState] = useState<TimeFormat>('24h');

  useEffect(() => {
    const storedFormat = localStorage.getItem('timeFormat') as TimeFormat | null;
    if (storedFormat) {
      setTimeFormatState(storedFormat);
    }
  }, []);

  const setTimeFormat = (format: TimeFormat) => {
    setTimeFormatState(format);
    localStorage.setItem('timeFormat', format);
  };

  return (
    <SettingsContext.Provider value={{ timeFormat, setTimeFormat }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
