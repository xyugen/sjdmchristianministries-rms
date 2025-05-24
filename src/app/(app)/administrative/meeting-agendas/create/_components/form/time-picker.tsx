"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface TimePickerProps {
  date?: Date;
  setDate: (date?: Date) => void;
  placeholder?: string;
}

export function TimePickerDemo({
  date,
  setDate,
  placeholder = "Select time",
}: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const [hour, setHour] = React.useState<string>(
    date ? format(date, "HH") : "",
  );
  const [minute, setMinute] = React.useState<string>(
    date ? format(date, "mm") : "",
  );
  const [isPM, setIsPM] = React.useState<boolean>(
    date ? date.getHours() >= 12 : false,
  );

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      value === "" ||
      (Number.parseInt(value) >= 0 && Number.parseInt(value) <= 23)
    ) {
      setHour(value);
      if (value.length === 2) {
        minuteRef.current?.focus();
      }
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      value === "" ||
      (Number.parseInt(value) >= 0 && Number.parseInt(value) <= 59)
    ) {
      setMinute(value);
    }
  };

  const handleAMPMToggle = () => {
    setIsPM(!isPM);
  };

  React.useEffect(() => {
    if (hour && minute) {
      const newHour =
        isPM && Number.parseInt(hour) < 12
          ? Number.parseInt(hour) + 12
          : !isPM && Number.parseInt(hour) === 12
            ? 0
            : Number.parseInt(hour);

      const newDate = new Date();
      newDate.setHours(newHour);
      newDate.setMinutes(Number.parseInt(minute));
      newDate.setSeconds(0);
      newDate.setMilliseconds(0);
      setDate(newDate);
    } else if (!hour && !minute) {
      setDate(undefined);
    }
  }, [hour, minute, isPM]);

  React.useEffect(() => {
    if (date) {
      const hours = date.getHours();
      setIsPM(hours >= 12);
      setHour(format(date, "hh"));
      setMinute(format(date, "mm"));
    }
  }, [date]);

  const clearTime = () => {
    setHour("");
    setMinute("");
    setDate(undefined);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground",
          )}
        >
          <Clock className="mr-2 h-4 w-4" />
          {date ? format(date, "hh:mm a") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="flex items-center justify-between gap-2">
          <div className="grid gap-1 text-center">
            <div className="text-sm font-medium">Hour</div>
            <Input
              ref={hourRef}
              className="w-14 text-center"
              value={hour}
              onChange={handleHourChange}
              placeholder="HH"
              maxLength={2}
            />
          </div>
          <div className="grid gap-1 text-center">
            <div className="text-sm font-medium">Minute</div>
            <Input
              ref={minuteRef}
              className="w-14 text-center"
              value={minute}
              onChange={handleMinuteChange}
              placeholder="MM"
              maxLength={2}
            />
          </div>
          <div className="grid gap-1 text-center">
            <div className="text-sm font-medium">AM/PM</div>
            <Button
              variant="outline"
              className="w-14"
              onClick={handleAMPMToggle}
            >
              {isPM ? "PM" : "AM"}
            </Button>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="sm" onClick={clearTime}>
            Clear
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
