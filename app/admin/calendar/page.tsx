'use client';

import { ScheduleCalendar } from '@/components/admin/ScheduleCalendar';

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Schedule</h1>
        <p className="text-muted-foreground">View and manage scheduled jobs.</p>
      </div>
      <ScheduleCalendar />
    </div>
  );
}
