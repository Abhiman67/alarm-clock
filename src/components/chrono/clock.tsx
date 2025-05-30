"use client";

import React, { useState, useEffect } from 'react';
import { useSettings } from '@/context/settings-context';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ClockComponent: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const { timeFormat } = useSettings();

  useEffect(() => {
    setCurrentTime(new Date()); // Set initial time on client
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  const formatTime = (date: Date | null) => {
    if (!date) return "Loading...";
    return date.toLocaleTimeString(undefined, {
      hour12: timeFormat === '12h',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-7xl md:text-8xl font-mono font-bold text-accent">
        {formatTime(currentTime)}
      </div>
      <div className="text-lg md:text-xl text-muted-foreground mt-2">
        {formatDate(currentTime)}
      </div>
    </div>
  );
};

export default ClockComponent;
