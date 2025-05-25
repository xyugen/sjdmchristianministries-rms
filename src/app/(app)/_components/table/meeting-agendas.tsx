"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/react";
import { format } from "date-fns/format";

export interface MeetingAgenda {
  id: string;
  date: string;
  title: string;
  presiding: string;
  startTime: string;
  endTime: string;
}

interface MeetingAgendaTableProps {
  agendas: MeetingAgenda[];
}

const MeetingAgendaTable = () => {
  const meetingAgendas = api.administrative.getAllMeetingAgendas.useQuery();
  const agendas = meetingAgendas.data || [];
  return (
    <Card className="w-full rounded-xl shadow-none">
      <CardHeader>
        <CardTitle className="text-md md:text-lg">
          Recent Meeting Agendas
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <Table className="sm:w-full">
          <TableHeader>
            <TableRow className="border-b border-gray-200">
              <TableHead className="font-medium">Date</TableHead>
              <TableHead className="font-medium">Meeting Agenda</TableHead>
              <TableHead className="font-medium">Presiding Officer</TableHead>
              <TableHead className="font-medium">Start / Finish</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {agendas.slice(0, 5).map((agenda, index) => (
              <TableRow key={agenda.id} className="border-b border-gray-200">
                <TableCell className="py-3 md:w-1/4">
                  {format(agenda.meetingDate, "yyyy-MM-dd")}
                </TableCell>
                <TableCell className="py-3 md:w-1/4">{agenda.agenda}</TableCell>
                <TableCell className="py-3 md:w-1/4">
                  {agenda.presidingOfficer}
                </TableCell>
                <TableCell className="py-3 md:w-1/4">
                  {agenda.startTime && agenda.endTime
                    ? `${agenda.startTime} – ${agenda.endTime}`
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
