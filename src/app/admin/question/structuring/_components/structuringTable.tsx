import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QuestionInterface } from "@/lib/interface";
import { EyeIcon, SquarePen, Trash } from "lucide-react";
import Link from "next/link";

const tHeadItems = ["No", "Question", "Type", "Answer", "Action"];

const StructuringTable = ({
    questionData,
    setIsOpen,
    setDialogAction,
    setSelectedQuestion,
  }: {
    questionData: QuestionInterface[];
    setIsOpen: (isOpen: boolean) => void;
    setDialogAction: (action: string) => void;
    setSelectedQuestion: (question: QuestionInterface) => void;
  }) => {
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
          {questionData.map((item, index) => (
            <TableRow key={item.uuid}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="truncate max-w-xs">{item.question}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.answer}</TableCell>
              <TableCell className="flex z-10 gap-x-1">
                <EyeIcon
                  onClick={() => {
                    setIsOpen(true);
                    setDialogAction("view");
                    setSelectedQuestion(item);
                  }}
                />
                <Link href={"./structuring/" + item.uuid}>
                  <SquarePen />
                </Link>
                <Trash onClick={() => {
                    setIsOpen(true);
                    setDialogAction("delete");
                    setSelectedQuestion(item);
                  }}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };
 
export default StructuringTable;