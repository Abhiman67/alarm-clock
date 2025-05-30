"use client";

import React from 'react';
import { useSettings } from '@/context/settings-context';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const SettingsComponent: React.FC = () => {
  const { timeFormat, setTimeFormat } = useSettings();

  return (
    <Card>
      <CardHeader>
        <CardTitle>App Settings</CardTitle>
        <CardDescription>Customize your ChronoMaster experience.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-lg font-medium">Time Format</Label>
          <RadioGroup
            value={timeFormat}
            onValueChange={(value) => setTimeFormat(value as '12h' | '24h')}
            className="flex space-x-4 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="12h" id="12h" />
              <Label htmlFor="12h" className="cursor-pointer">12-Hour</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="24h" id="24h" />
              <Label htmlFor="24h" className="cursor-pointer">24-Hour</Label>
            </div>
          </RadioGroup>
          <p className="text-sm text-muted-foreground">
            Choose how time is displayed throughout the app.
          </p>
        </div>
        
        {/* Placeholder for Theme settings */}
        {/* <div className="space-y-2">
          <Label className="text-lg font-medium">Theme</Label>
           <p className="text-sm text-muted-foreground">
            Theme customization is applied globally via CSS variables.
          </p>
        </div> */}
      </CardContent>
    </Card>
  );
};

export default SettingsComponent;
