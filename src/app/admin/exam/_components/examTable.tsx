import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash } from "lucide-react";

const tHeadItems = [
  "id",
  "name",
  "bunder",
  "access",
  "duration",
  "status",
  "expired",
  "action",
];

const ExamTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tHeadItems.map((item) => (
            <TableHead
              key={item}
              className={`text-white bg-[#1E56A0] ${
                item == "id" ? "w-[40px]" : item == "action" ? "w-[80px]" : ""
              }`}
            >
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>1</TableCell>
          <TableCell>Ujian 1</TableCell>
          <TableCell>Matematika</TableCell>
          <TableCell>Public</TableCell>
          <TableCell>60</TableCell>
          <TableCell>Active</TableCell>
          <TableCell>2022-12-31</TableCell>
          <TableCell className="flex z-10">
            <SquarePen />
            <Trash />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ExamTable;
