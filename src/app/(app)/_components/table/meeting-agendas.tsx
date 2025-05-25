"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/trpc/react";
import { formatDate } from "date-fns";
import { format } from "date-fns/format";

export interface MeetingAgenda {
  id: string;
  date: string;
  title: string;
  presiding: string;
  startTime: string;
  endTime: string;
}

const MeetingAgendaTable = () => {
  const meetingAgendas = api.administrative.getAllMeetingAgendas.useQuery();
  const agendas = meetingAgendas.data ?? [];
  return (
    <Card className="rounded-sm shadow-none">
      <CardHeader>
        <CardTitle>Recent Meeting Agendas</CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="font-medium">Date</TableHead>
              <TableHead className="font-medium">Meeting Agenda</TableHead>
              <TableHead className="font-medium">Presiding Officer</TableHead>
              <TableHead className="font-medium">Start / Finish</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agendas.slice(0, 5).map((agenda) => (
              <TableRow key={agenda.id} className="border-b border-gray-200">
                <TableCell className="py-3">
                  {format(agenda.meetingDate, "yyyy-MM-dd")}
                </TableCell>
                <TableCell className="py-3">{agenda.agenda}</TableCell>
                <TableCell className="py-3">
                  {agenda.presidingOfficer}
                </TableCell>
                <TableCell className="py-3">
                  {agenda.startTime && agenda.endTime
                    ? `${formatDate(agenda.startTime, "hh:mm a")} – ${formatDate(agenda.endTime, "hh:mm a")}`
                    : "No date selected"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default MeetingAgendaTable;
