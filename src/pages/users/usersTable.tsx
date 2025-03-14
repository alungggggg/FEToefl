import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UsersInterface } from "@/lib/interface";
import { PenIcon, SquarePen, Trash } from "lucide-react";
import React from "react";

const tHeadItems = ["No", "Name", "Username", "exam id", ""];

const UsersTable = ({
  usersData,
  setDialogAction,
  setIsOpen,
}: {
  usersData: Array<UsersInterface>;
  setDialogAction: React.Dispatch<React.SetStateAction<string>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tHeadItems.map((item) => (
            <TableHead
              key={item}
              className={`${
                item == "No" ? "w-[40px]" : item == "" ? "w-[80px]" : ""
              }`}
            >
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {usersData.map((item, i) => (
          <TableRow key={i}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.username}</TableCell>
            <TableCell>{item.exam}</TableCell>
            <TableCell className="flex z-10">
              <SquarePen onClick={() => {
                setDialogAction("edit")
                setIsOpen(true)
              }} />
              <Trash onClick={() => {
                setDialogAction("delete")
                setIsOpen(true)
              }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
