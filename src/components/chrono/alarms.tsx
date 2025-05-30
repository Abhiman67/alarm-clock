"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { PlusIcon, Trash2Icon, EditIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import AlarmForm from './alarm-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

export interface Alarm {
  id: string;
  time: string; // HH:MM
  label: string;
  enabled: boolean;
}

const AlarmsComponent: React.FC = () => {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAlarm, setEditingAlarm] = useState<Alarm | null>(null);
  const [alarmToDelete, setAlarmToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const storedAlarms = localStorage.getItem('alarms');
    if (storedAlarms) {
      setAlarms(JSON.parse(storedAlarms));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('alarms', JSON.stringify(alarms));
  }, [alarms]);

  const handleAddOrUpdateAlarm = (data: { time: string; label: string }) => {
    if (editingAlarm) {
      setAlarms(alarms.map(a => a.id === editingAlarm.id ? { ...editingAlarm, ...data } : a));
      toast({ title: "Alarm Updated", description: `Alarm "${data.label}" updated successfully.` });
      setEditingAlarm(null);
    } else {
      const newAlarm: Alarm = {
        id: Date.now().toString(),
        ...data,
        enabled: true,
      };
      setAlarms([newAlarm, ...alarms]);
      toast({ title: "Alarm Added", description: `Alarm "${data.label}" set for ${data.time}.` });
    }
    setIsFormOpen(false);
  };
  
  const openEditForm = (alarm: Alarm) => {
    setEditingAlarm(alarm);
    setIsFormOpen(true);
  };

  const requestDeleteAlarm = (id: string) => {
    setAlarmToDelete(id);
  };
  
  const confirmDeleteAlarm = () => {
    if (alarmToDelete) {
      const alarm = alarms.find(a => a.id === alarmToDelete);
      setAlarms(alarms.filter(a => a.id !== alarmToDelete));
      toast({ title: "Alarm Deleted", description: `Alarm "${alarm?.label}" deleted.`, variant: "destructive" });
      setAlarmToDelete(null);
    }
  };

  const toggleAlarm = (id: string) => {
    setAlarms(
      alarms.map(alarm =>
        alarm.id === id ? { ...alarm, enabled: !alarm.enabled } : alarm
      )
    );
  };

  const checkAlarms = useCallback(() => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    alarms.forEach(alarm => {
      if (alarm.enabled && alarm.time === currentTime) {
        // Prevent multiple alerts for the same minute by disabling or marking as triggered
        // For simplicity, we'll just toast. A more robust solution might involve a 'lastTriggered' timestamp.
        toast({
          title: "Alarm Ringing!",
          description: `${alarm.label} (${alarm.time})`,
          duration: 10000, // Keep toast longer
        });
        // Optionally disable the alarm after it rings once to prevent continuous alerts
        // toggleAlarm(alarm.id); 
      }
    });
  }, [alarms, toast]);

  useEffect(() => {
    const intervalId = setInterval(checkAlarms, 15000); // Check every 15 seconds
    return () => clearInterval(intervalId);
  }, [checkAlarms]);


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Your Alarms</h2>
        <Button onClick={() => { setEditingAlarm(null); setIsFormOpen(true); }}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Alarm
        </Button>
      </div>

      <AlarmForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleAddOrUpdateAlarm}
        defaultValues={editingAlarm ? { time: editingAlarm.time, label: editingAlarm.label } : undefined}
      />

      {alarms.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No alarms set. Add one to get started!</p>
      ) : (
        <Card>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <ul className="divide-y divide-border">
                {alarms.map(alarm => (
                  <li key={alarm.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                    <div>
                      <p className={`text-2xl font-medium ${!alarm.enabled ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                        {alarm.time}
                      </p>
                      <p className={`text-sm ${!alarm.enabled ? 'text-muted-foreground' : 'text-foreground'}`}>
                        {alarm.label}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3">
                       <Button variant="ghost" size="icon" onClick={() => openEditForm(alarm)} aria-label="Edit alarm">
                        <EditIcon className="h-4 w-4" />
                      </Button>
                      <Switch
                        checked={alarm.enabled}
                        onCheckedChange={() => toggleAlarm(alarm.id)}
                        aria-label={alarm.enabled ? 'Disable alarm' : 'Enable alarm'}
                      />
                      <Button variant="ghost" size="icon" onClick={() => requestDeleteAlarm(alarm.id)} aria-label="Delete alarm">
                        <Trash2Icon className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      )}
      <AlertDialog open={!!alarmToDelete} onOpenChange={(open) => !open && setAlarmToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the alarm.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAlarmToDelete(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteAlarm} className={buttonVariants({variant: "destructive"})}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// Helper (can be moved to ui/button if needed, or keep here if specific styling is only for this dialog)
const buttonVariants = ({ variant }: { variant?: "destructive" | "outline" | "default" }) => {
  if (variant === "destructive") return "bg-destructive text-destructive-foreground hover:bg-destructive/90";
  // Add other variants if needed
  return "";
};


export default AlarmsComponent;
