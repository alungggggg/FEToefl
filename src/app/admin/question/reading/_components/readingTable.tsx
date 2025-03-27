import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SquarePen, Trash } from "lucide-react";

const tHeadItems = ["No", "Question", "Type", "Answer", "Action"];

const ReadingTable = () => {
  return (
    <Table>
      <TableHeader className="bg-[#1E56A0] text-white">
        <TableRow>
          {tHeadItems.map((item) => (
            <TableHead
              key={item}
              className={`text-white ${
                item.toLowerCase() == "No"
                  ? "w-[40px]"
                  : item.toLowerCase() == "action"
                  ? "w-[80px]"
                  : ""
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
          <TableCell>Apa nama hewan berkaki 4 ?</TableCell>
          <TableCell>Reading</TableCell>
          <TableCell>Gajah</TableCell>
          <TableCell className="flex z-10">
            <SquarePen />
            <Trash />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default ReadingTable;
