import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClockComponent from "@/components/chrono/clock";
import StopwatchComponent from "@/components/chrono/stopwatch";
import AlarmsComponent from "@/components/chrono/alarms";
import SettingsComponent from "@/components/chrono/settings";
import { ClockIcon, TimerIcon, AlarmClockIcon, SettingsIcon } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 md:p-8 bg-background">
      <header className="my-8 md:my-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground tracking-tight">
          ChronoMaster
        </h1>
        <p className="text-lg text-muted-foreground mt-2">
          Your ultimate timekeeping companion
        </p>
      </header>

      <Tabs defaultValue="clock" className="w-full max-w-3xl">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto md:h-12 rounded-lg shadow-md">
          <TabsTrigger value="clock" className="py-3 text-sm md:text-base">
            <ClockIcon className="mr-2 h-5 w-5" />
            Clock
          </TabsTrigger>
          <TabsTrigger value="stopwatch" className="py-3 text-sm md:text-base">
            <TimerIcon className="mr-2 h-5 w-5" />
            Stopwatch
          </TabsTrigger>
          <TabsTrigger value="alarms" className="py-3 text-sm md:text-base">
            <AlarmClockIcon className="mr-2 h-5 w-5" />
            Alarms
          </TabsTrigger>
          <TabsTrigger value="settings" className="py-3 text-sm md:text-base">
            <SettingsIcon className="mr-2 h-5 w-5" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="clock"
          className="mt-6 p-6 md:p-8 rounded-xl shadow-xl bg-card min-h-[400px] flex items-center justify-center"
          aria-labelledby="Clock tab"
        >
          <ClockComponent />
        </TabsContent>
        <TabsContent
          value="stopwatch"
          className="mt-6 p-6 md:p-8 rounded-xl shadow-xl bg-card min-h-[400px] flex items-center justify-center"
          aria-labelledby="Stopwatch tab"
        >
          <StopwatchComponent />
        </TabsContent>
        <TabsContent
          value="alarms"
          className="mt-6 p-6 md:p-8 rounded-xl shadow-xl bg-card min-h-[400px]"
          aria-labelledby="Alarms tab"
        >
          <AlarmsComponent />
        </TabsContent>
        <TabsContent
          value="settings"
          className="mt-6 p-6 md:p-8 rounded-xl shadow-xl bg-card min-h-[400px]"
          aria-labelledby="Settings tab"
        >
          <SettingsComponent />
        </TabsContent>
      </Tabs>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} ChronoMaster. All rights reserved.</p>
      </footer>
    </div>
  );
}
