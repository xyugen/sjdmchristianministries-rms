import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  className?: string;
}

const MeetingAgendaTable = ({
  agendas,
  className,
}: MeetingAgendaTableProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Meeting Agendas</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
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
            {agendas.map((agenda) => (
              <TableRow key={agenda.id} className="border-b border-gray-200">
                <TableCell className="py-3">{agenda.date}</TableCell>
                <TableCell className="py-3">{agenda.title}</TableCell>
                <TableCell className="py-3">{agenda.presiding}</TableCell>
                <TableCell className="py-3">{`${agenda.startTime} – ${agenda.endTime}`}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default MeetingAgendaTable;