"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlayIcon, PauseIcon, RotateCcwIcon, ListIcon, SquareIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { formatStopwatchTime } from '@/lib/helpers';

const StopwatchComponent: React.FC = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastLapTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10); // Update every 10ms for smoother display
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, time]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    lastLapTimeRef.current = 0;
  };

  const handleLap = () => {
    if (isRunning) {
      const currentLapTime = time - lastLapTimeRef.current;
      setLaps((prevLaps) => [currentLapTime, ...prevLaps]);
      lastLapTimeRef.current = time;
    }
  };


  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-6xl md:text-7xl font-mono font-bold mb-8 text-foreground">
        {formatStopwatchTime(time)}
      </div>
      <div className="flex space-x-4 mb-8">
        <Button onClick={handleStartStop} variant="outline" size="lg" className="w-32">
          {isRunning ? <PauseIcon className="mr-2 h-5 w-5" /> : <PlayIcon className="mr-2 h-5 w-5" />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
        <Button onClick={handleLap} variant="outline" size="lg" className="w-32" disabled={!isRunning && time === 0}>
          <ListIcon className="mr-2 h-5 w-5" />
          Lap
        </Button>
        <Button onClick={handleReset} variant="destructive" size="lg" className="w-32">
          <RotateCcwIcon className="mr-2 h-5 w-5" />
          Reset
        </Button>
      </div>
      {laps.length > 0 && (
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Laps</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-48">
              <ul className="space-y-2">
                {laps.map((lap, index) => (
                  <React.Fragment key={index}>
                    <li className="flex justify-between items-center p-2 rounded-md bg-muted/50">
                      <span className="text-sm text-muted-foreground">Lap {laps.length - index}</span>
                      <span className="font-mono text-sm">{formatStopwatchTime(lap)}</span>
                    </li>
                    {index < laps.length -1 && <Separator />}
                  </React.Fragment>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StopwatchComponent;
