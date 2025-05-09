import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExamsInterface } from "@/lib/interface";
import { EyeIcon, SquarePen, Trash } from "lucide-react";
import Link from "next/link";

const tHeadItems = ["No", "name", "Code", "access", "expired", "action"];

const ExamTable = ({
  examsData,
  setOpen,
  setAction,
  setExamDialogData,
}: {
  examsData: ExamsInterface[];
  setOpen: (open: boolean) => void;
  setAction: (action: string) => void;
  setExamDialogData: (data: ExamsInterface) => void;
}) => {
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
        {examsData?.map((item, index) => (
          <TableRow key={item.uuid}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.code}</TableCell>
            <TableCell>{item.access}</TableCell>
            <TableCell>{item.expired}</TableCell>
            <TableCell className="text-center flex justify-center items-center gap-1">
              <EyeIcon
                onClick={() => {
                  setOpen(true);
                  setAction("show");
                  setExamDialogData(item);
                }}
              />
              <Link href={`/admin/exam/${item.uuid}`}>
                <SquarePen />
              </Link>
              <Trash
                onClick={() => {
                  setOpen(true);
                  setAction("delete");
                  setExamDialogData(item);
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ExamTable;
